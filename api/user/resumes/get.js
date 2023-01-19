import fetch from "node-fetch";
import { createClient } from '@supabase/supabase-js';
import { askAI, validateJWT, seeHowManyMade } from "../../utils";

const jwt = require("jsonwebtoken");
const OpenAI = require("openai-api");


module.exports = async (req, res) => {
	const OPENAI_API_KEY = process.env.OPEN_AI_KEY;
	//

	const openai = new OpenAI(OPENAI_API_KEY);

	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res)

    const userCreds = await seeHowManyMade(user_sub)
    console.log(userCreds)
	


	res.status(200).send({ userCreds});
};
