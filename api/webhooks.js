import Stripe from 'stripe';
import { buffer } from 'micro';

// Specific to this API route, only local, does not effect other APIs
export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function webhookHandler(req, res) {
	console.log('HITHIT');
	const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];
		// const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
		const webhookSecret =
			'whsec_93b82ef52551dd83c1602f306809c1f389f913b989ac50165a7e68791d158c5b';

		let event;

		try {
			if (!sig || !webhookSecret) return;

			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
		} catch (error) {
			console.log(`WEBHOOK ERROR: ${error.message}`);
			return res.status(400).send(`WEBHOOK ERROR: ${error.message}`);
		}

		let eventType = req.body.type;
		console.log('EVENT', event);

		if (eventType === 'payment_intent.succeeded') {
			console.log('PAYMENT SUCCESFUL', eventType);
		} else {
			console.log('PAYMENT NOT SUCCESFUL', eventType);
		}

		res.status(200).send();
	}
}
