import { createClient } from '@supabase/supabase-js';

const jwt = require('jsonwebtoken');
const OpenAI = require('openai-api');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const OPENAI_API_KEY = process.env.OPEN_AI_KEY;
//

const openai = new OpenAI(OPENAI_API_KEY);
//TODO: use different secret

/**
 *
 * @param {*} auth the auth token of the user
 * @returns Returns status:false || status:true depending on whether or not the verification passes
 * 			If the verification passes then we return a user object of info, otherwise we return a token error
 */
const validateJWT = (auth, res) => {
	console.log('Process Env Toke', process.env.JWT_TOKEN);
	let ub = jwt.verify(auth, process.env.JWT_TOKEN, (err, user) => {
		if (err) {
			console.log(err);
			res.status(400).send({ error: err });
		}
		if (!err) {
			return user.sub;
		}
	});
	console.log(ub);
	return ub;
};
const seeHowManyMade = async (uuid) => {
	console.log(uuid);
	const { data, error } = await supabase
		.from('li_resumes')
		.select('*')
		.match({ uuid: uuid });
	if (error) {
		return null;
	} else {
		return data.length;
	}
};

const insertNewUserToPaidCol = async(uuid)=>{
	const {data, error} = await supabase.from("users_li").insert({id:uuid, num_purchased:3})
	if(error){
		return null
	} else {
		return true
	}

}
const updateNumCovers = async(uuid)=>{
	const {data, error} = await supabase.rpc("decrement_num_if", {
		user_id:uuid
	})
	if(error){
		console.log(error)
	}
}
const seeHowManyCovers = async (uuid) => {
	console.log(uuid);
	const { data, error } = await supabase
		.from('users_li')
		.select('*')
		.match({ id: uuid });
	if (error) {
		console.log(error)
		return null;
	} else {
		if(data[0] === undefined || !data[0]){
			const didI = await insertNewUserToPaidCol(uuid)
			if(!didI){
				return null
			} else {
				return 3
			}

		} else {
			return data[0].num_purchased;
		}

	}
};

const askAI = async (prompt, temperature) => {
	let toReturn = await openai.complete({
		engine: 'text-davinci-003',
		prompt,
		temperature,
		max_tokens: 2048,
		top_p: 1,
		frequency_penalty: 0.4,
		presence_penalty: 0,
	});
	console.log(toReturn.res);
	return toReturn.data.choices[0].text;
};

module.exports = {
	validateJWT,
	askAI,
	seeHowManyMade,
	seeHowManyCovers,
	updateNumCovers
};
