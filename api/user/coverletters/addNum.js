import { AddCoverLetters, validateJWT } from '../../utils';

module.exports = async (req, res) => {
	console.log('THIS GOT CALLED', req);
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res);

	const newNum = req.body;

	console.log('YYYYYYYYY');
	console.log('newNum', newNum);

	const userCreds = await AddCoverLetters(user_sub, 20);

	res.status(200).send({ userCreds });
};
