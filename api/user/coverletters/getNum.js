import { seeHowManyCovers, validateJWT } from '../../utils';

module.exports = async (req, res) => {
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res);
    
	const userCreds = await seeHowManyCovers(user_sub);

	res.status(200).send({ userCreds });
};
