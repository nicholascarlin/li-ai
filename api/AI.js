import { createClient } from '@supabase/supabase-js';
import { validateJWT } from './utils';

const OpenAI = require('openai-api');

module.exports = async (req, res) => {
	const OPENAI_API_KEY = process.env.OPEN_AI_KEY;
	//

	console.log("here")
	const openai = new OpenAI(OPENAI_API_KEY);
	const { wExp, edExp, accpHA, person, linkedinurl } = req.body;
	const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
	const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res);

	let li_url = linkedinurl.trim();
	li_url += linkedinurl.endsWith('/') ? '' : '/';
	li_url = li_url.replace(/\s+/g, '');

	const addToSupabase = async (work_experiences) => {
		const { data, error } = await supabase
			.from('li_bot')
			.insert({ linkedin_url: li_url, work_experience: work_experiences });
	};

	const checkForSaved = async () => {
		console.log("POOP")
		const { data, error } = await supabase
			.from('li_bot')
			.select('*')
			.eq('linkedin_url', li_url);
		if (error) {
			console.log(error);
			res.status(400).send({ error: error });
		}
		if (data[0] !== undefined) {
			if (data[0].work_experience) {
				console.log('Good!');
				return { status: true, work: data[0].work_experience };
			} else {
				return { status: false };
			}
		} else {
			return { status: false };
		}
	};
	//See if the profile is already in supabase.
	const isSaved = await checkForSaved();

	let SampleData;
	if (!isSaved.status) {
		res.status(401).send({ status: 'Error — no saved resume' });
	} else {
		SampleData = isSaved.work;
	}
	//function to insert resume into supabase
	const saveResume = async (uuid, resume_data) => {
		const { data, error } = await supabase
			.from('li_resumes')
			.insert({ uuid, resume_data });
		if (error) {
			console.log(error);
		}
		return;
	};

	for (let j in wExp) {
		if (SampleData.experiences.includes(wExp[j])) {
			console.log('Good');
		} else {
			console.log('Unauthorized..');
		}
	}

	// Removing extraneous data to keep the obj light

	//This is the first step to cleaning up — generating data for each exp.
	// for(let i in wExp){

	// 	const descript = await askAI(`Write a summary in resume style of the following work
	// 	experience ${wExp[i].title}
	// 	${wExp[i].company}
	// 	${wExp[i].description}
	// 	${wExp[i].location ? wExp[i].location : ""}
	// 	${wExp[i].starts_at}
	// 	${wExp[i].ends_at}`, .2)
	// 	workExpVals.push(descript)

	// }
	//TODO: Repeat the above process for education
	//TODO: Repeat the process for each relevant field
	//TODO make it such that you can insert the responses into a resume template.
	console.log("Here 2")
	const nobj = {};
	nobj.education = edExp;

	nobj.city = person.city;
	nobj.work_experiences = wExp;
	nobj.name = person.full_name;
	nobj.accomplishments = accpHA;

	/**
	 *
	 * @param {*} prompt prompt of users linkedin info
	 * @returns A fully formatted (theoretical) resume.
	 */
	const GenerateAnswer = async(prompt) => {
		//let str = prompt.name + " " + prompt.skills + " "+ prompt.city + " " + JSON.stringify(prompt.work_experiences)+ " " + JSON.stringify(prompt.education)
		let companies = [];
	
		for (let i = 0; i < prompt.work_experiences.length; i++) {
			companies[i] = prompt.work_experiences[i].company;
		}

		let str =
			prompt.name +
			' ' +
			prompt.accomplishments +
			' ' +
			prompt.city +
			' ' +
			JSON.stringify(prompt.work_experiences) +
			' ' +
			JSON.stringify(prompt.education) +
			JSON.stringify(companies);
		console.log(companies)
		let toReturn = await openai.complete({
			engine: 'text-davinci-003',
			prompt: `Given the following string, generate a resume. 
			Make sure the returned resume is one that could be displayed in HTML. Do not include any images. Make sure all work experiences are included. 
			Each experience should include a brief description. Descriptions should be in bullet points. Clearly define each section of the resume by format. 
			Include at the top of the resume a brief summary of the person written in the first person perspective of the person whose resume this is. 
			Make this summary no more than 4 sentences. 
			Education and Work experience are required sections.
			Make sections of the resume clear.
			This is the data to build the resume off of:${str}. The subtitles in "work-experience" should be the names of the companies: ${companies}, with the role at each company listed below the company name.`,
			temperature: 0.6,
			max_tokens: 1400,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});
	
		return toReturn.data.choices[0].text;
	};

	const toReturn = await GenerateAnswer(nobj);
	console.log(toReturn)
	await saveResume(user_sub, toReturn);
	res.status(200).send({ data: toReturn });
};
