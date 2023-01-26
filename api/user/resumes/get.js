import { seeHowManyMade, validateJWT } from '../../utils';

module.exports = async (req, res) => {
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res);

	const userCreds = await seeHowManyMade(user_sub);
	console.log(userCreds);

	res.status(200).send({ userCreds });
};
