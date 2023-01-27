import { askAI, validateJWT } from './utils';

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const jwt = require('jsonwebtoken');
const OpenAI = require('openai-api');

module.exports = async (req, res) => {
	const OPENAI_API_KEY = process.env.OPEN_AI_KEY;
	//

	const { linkedinurl } = req.body;
	const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
	const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	let auth = req.headers.authorization;
	console.log(linkedinurl);
	console.log('Auth Next');
	console.log(auth);
	// let user_sub = validateJWT(auth, res);

	const addToSupabase = async (work_experiences) => {
		const { data, error } = await supabase
			.from('li_bot')
			.insert({ linkedin_url: linkedinurl, work_experience: work_experiences });
	};
	const checkForSaved = async () => {
		const { data, error } = await supabase
			.from('li_bot')
			.select('*')
			.eq('linkedin_url', linkedinurl);
		if (error) {
			console.log(error);
			res.status(400).send({ error: error });
		}
		if (data[0] !== undefined) {
			if (data[0]) {
				console.log('Is Cached...', linkedinurl);
				return { status: true, work: data[0].work_experience };
			} else {
				console.log('Is NOT Cached...', linkedinurl);
				return { status: false };
			}
		} else {
			console.log('Is NOT Cached...', linkedinurl);
			return { status: false };
		}
	};
	//See if the profile is already in supabase.
	const isSaved = await checkForSaved();

	let SampleData;
	if (!isSaved.status) {
		var options = {
			method: 'GET',
			url: `https://nubela.co/proxycurl/api/v2/linkedin?url=${linkedinurl}/&fallback_to_cache=on-error&use_cache=if-recent&skills=include&inferred_salary=include&personal_email=include&personal_contact_number=include&twitter_profile_id=include&facebook_profile_id=include&github_profile_id=include&extra=include`,
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer 4lfOliLcJl_GvgcrLomQrA',
			},
		};

		const fetchIt = await fetch(options.url, {
			method: 'GET',
			headers: options.headers,
		});

		SampleData = await fetchIt.json();
		await addToSupabase(SampleData); // add profile to supabasse
	} else {
		SampleData = isSaved.work;
	}
	//function to insert resume into supabase

	res.status(200).send({ data: SampleData });
};
