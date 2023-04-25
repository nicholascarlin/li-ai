import { seeHowManyCovers, updateNumCovers, validateJWT } from './utils';

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const OpenAI = require('openai-api');

module.exports = async (req, res) => {
	const OPENAI_API_KEY = process.env.OPEN_AI_KEY;
	//

	const openai = new OpenAI(OPENAI_API_KEY);
	const { linkedinurl, company_url, title_applying_for } = req.body;
	const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
	const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res);
	const numRemaining = await seeHowManyCovers(user_sub);
	if (!numRemaining || numRemaining === 0) {
		res.status(400).send({ status: false, message: 'upgrade account' });
	} else {
		if (!linkedinurl || !company_url || !title_applying_for) {
			res.status(400).send({ status: false, error: 'Invalid input.' });
		}

		let li_url = linkedinurl.trim();
		li_url += linkedinurl.endsWith('/') ? '' : '/';
		li_url = li_url.replace(/\s+/g, '');
		let c_url = company_url.replace(/\/$/, '').trim();
		c_url = c_url.replace(/\s+/g, '');

		console.log('CURL', c_url);

		const checkForSaved = async (url) => {
			const { data, error } = await supabase
				.from('li_bot')
				.select('*')
				.eq('linkedin_url', url);
			if (error) {
				console.log(error);
				res.status(400).send({ error: error });
			}
			if (data[0] !== undefined) {
				if (data[0]) {
					console.log('Is Cached...', url);
					return { status: true, work: data[0].work_experience };
				} else {
					console.log('Is NOT Cached...', url);
					return { status: false };
				}
			} else {
				console.log('Is NOT Cached...', url);
				return { status: false };
			}
		};

		//See if the profile is already in supabase.
		const isSaved = await checkForSaved(li_url);

		let callingUser;
		if (!isSaved.status) {
			var options = {
				method: 'GET',
				url: `https://www.applicantai.com/api/liProf`,
				headers: {
					'Content-Type': 'application/json',
					authorization: req.headers.authorization,
				},
			};
			const fetchIt = await fetch(options.url, {
				method: 'POST',
				headers: options.headers,
				body: JSON.stringify({
					linkedinurl: li_url,
				}),
			});

			const nd = await fetchIt.json();
			callingUser = nd?.data;
		} else {
			callingUser = isSaved.work;
		}

		//function to insert resume into supabase
		const saveCoverLetter = async (uuid, letter_data, company) => {
			console.log('COMPANY COMPANY');
			console.log('COMPANy NAME', company.name);
			console.log('POSITION POSITION');
			console.log('OPOSITION NAME', title_applying_for);
			const { data, error } = await supabase
				.from('li_covers')
				.insert({
					uuid,
					cover_letter: letter_data,
					company_name: company.name,
					position_name: title_applying_for,
				})
				.select();
			if (error) {
				console.log(error);
			}
			if (data) {
				return data[0];
			} else {
				return null;
			}
		};

		// Removing extraneous data to keep the obj light

		//This is the first step to cleaning up — generating data for each exp.

		//TODO: Repeat the above process for education
		//TODO: Repeat the process for each relevant field
		//TODO make it such that you can insert the responses into a resume template.

		const nobj = {};

		nobj.work_experiences = callingUser.experiences;

		/**
		 *
		 * @param {*} prompt prompt of users linkedin info
		 * @returns A fully formatted (theoretical) resume.
		 */
		const GenerateAnswer = async (prompt, company) => {
			console.log('PROMPT PROMPT', prompt);
			console.log(company?.description);
			//let str = prompt.name + " " + prompt.skills + " "+ prompt.city + " " + JSON.stringify(prompt.work_experiences)+ " " + JSON.stringify(prompt.education)
			let companies = [];

			for (let i = 0; i < prompt.work_experiences.length; i++) {
				companies[i] = prompt.work_experiences[i].company;
			}
			let toReturn = await openai.complete({
				engine: 'text-davinci-003',
				prompt: `Given the following information, generate a long form cover letter from the persepctive of someone applying to the company, ${company?.name} for 
				the role of ${title_applying_for}. Your name is ${callingUser?.full_name} Make sure that the most recent / 
				longest experience is the most prominent. The cover letter should be addressed to ${company?.name}, so any greeting (like dear, or hello, 
				should be addressed to the company.)
				Make sure the returned cover letter is one that could be displayed in HTML. Be clear, detailed, and professional. Reference specific reasons why the applicant is suited to work at ${company?.name}. Mention the name of the company (${company?.name}) at least once in every paragraph. Use buzzwords like "organized", "dedicated", "passionate". 
				Discuss why the role you are applying for matches your passion and work history. This is your work history: ${companies} If ${company?.name} has a mission statement, discuss why that fits your desire to work there.
				Discuss past work experience and why you are a good fit at the company. You must directly connect your experience to the work of the 
				company the cover letter is for and reference why you want to work at ${company?.name} specifically. This is the 
				company: ${company?.name}. The company describes itself as,  ${company?.description} and has a mission of, ${company?.tagline}. This is the information of the person to write the cover letter for: ${prompt?.name} . 
				Make sure the returned cover letter is one that could be displayed in HTML. This means it should include opening and closing HTML tags. Do not include any of the prompt in your response.`,
				temperature: 0.7,
				max_tokens: 1800,
				top_p: 1,
				frequency_penalty: 0.2,
				presence_penalty: 0,
			});

			return toReturn.data.choices[0].text;
		};

		const companyIsSaved = await checkForSaved(c_url);

		if (!companyIsSaved.status) {
			const insertCompany = async (sampleData) => {
				const { data, error } = await supabase.from('li_bot').insert({
					linkedin_url: c_url,
					work_experience: sampleData,
					is_company: true,
				});
				if (error) {
					console.log(error);
				}
			};
			const getCompany = async () => {
				console.log('Fetching data...');
				var options = {
					method: 'GET',
					url: `https://nubela.co/proxycurl/api/linkedin/company?resolve_numeric_id=true&extra=include&url=${c_url}&use_cache=if-present`,
					headers: {
						Accept: 'application/json',
						Authorization: 'Bearer 4lfOliLcJl_GvgcrLomQrA',
					},
				};
				const fetchIt = await fetch(options.url, {
					method: 'GET',
					headers: options.headers,
				});

				callingUser = await fetchIt.json();

				return callingUser;
			};
			const companyData = await getCompany();
			await insertCompany(companyData);
			const toReturn = await GenerateAnswer(nobj, companyData);

			await updateNumCovers(user_sub);
			const coverLetterData = await saveCoverLetter(
				user_sub,
				toReturn,
				companyData
			);

			res.status(200).send({ data: coverLetterData });
		} else {
			console.log(companyIsSaved.status);
			const toReturn = await GenerateAnswer(nobj, companyIsSaved.work);

			await updateNumCovers(user_sub);
			const coverLetterData = await saveCoverLetter(
				user_sub,
				toReturn,
				companyIsSaved.work
			);
			res.status(200).send({ data: coverLetterData });
		}
	}
};
