import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

// Specific to this API route, only local, does not effect other APIs
export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function webhookHandler(req, res) {
	console.log('HITHIT');
	const stripe = new Stripe(process.env.STRIPE_LIVE_SECRET_KEY);

	const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
	const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);

	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];
		const webhookSecret = process.env.STRIPE_LIVE_WEBHOOK_SIGNING_SECRET;
		// const webhookSecret =
		// 	'whsec_93b82ef52551dd83c1602f306809c1f389f913b989ac50165a7e68791d158c5b';

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

		let client_secret = event.data.object.client_secret;
		let purchasedAmountCents = event.data.object.amount;
		let purchasedAmount;

		switch (purchasedAmountCents) {
			case 299:
				purchasedAmount = 5;
				break;

			case 499:
				purchasedAmount = 10;
				break;

			case 799:
				purchasedAmount = 20;
				break;

			default:
				purchasedAmount = 0;
		}

		const { data, error } = await supabase
			.from('payment_table')
			.update({
				is_paid: true,
			})
			.eq('payment_id', client_secret)
			.select('uuid');

		if (error) {
			console.log(error);
			res.status(400).send({ error: error });
		}

		let retrievedUUID;

		if (data) {
			retrievedUUID = data[0].uuid;
		}

		const { addError } = await supabase.rpc('incrementcoverletters', {
			num: purchasedAmount,
			user_uuid: retrievedUUID,
		});

		if (addError) {
			console.log('ADD ERROR', addError);
			res.status(400).send({ error: addError });
		} else {
			console.log('NAH ALL GOOD');
		}

		if (eventType === 'payment_intent.succeeded') {
			console.log('PAYMENT SUCCESFUL', eventType);
		} else {
			console.log('PAYMENT NOT SUCCESFUL', eventType);
		}

		res.status(200).send();
	}
}
