import { AddCoverLetters, validateJWT } from '../../utils';

module.exports = async (req, res) => {
	console.log('REQ', req);
	console.log('RES', res);

	// switch (event.type) {
	//     case 'payment_intent.succeeded':
	//       const paymentIntent = event.data.object;
	//       // Then define and call a function to handle the event payment_intent.succeeded
	//       break;
	//     // ... handle other event types
	//     default:
	//       console.log(`Unhandled event type ${event.type}`);
	//   }

	console.log('THIS GOT CALLED', req);
	let auth = req.headers.authorization;
	const user_sub = validateJWT(auth, res);

	const newNum = req.body;

	console.log('YYYYYYYYY');
	console.log('newNum', newNum);

	const userCreds = await AddCoverLetters(user_sub, 20);

	res.status(200).send({ userCreds });
};
