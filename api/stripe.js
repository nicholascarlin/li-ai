import { createClient } from '@supabase/supabase-js';
import { validateJWT } from './utils';

module.exports = async (req, res) => {
	try {
		console.log('HITHIT');
		const selectedOption = req.body;

		const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
		const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
		const supabase = createClient(supabaseUrl, supabaseKey);

		let auth = req.headers.authorization;
		const uuid = validateJWT(auth, res);

		let paymentAmount;
		let selectedQuantity;

		switch (selectedOption) {
			case 0:
				paymentAmount = 299;
				selectedQuantity = 5;
				break;

			case 1:
				paymentAmount = 499;
				selectedQuantity = 10;
				break;

			case 2:
				paymentAmount = 799;
				selectedQuantity = 20;
				break;

			default:
				paymentAmount = 0;
				selectedQuantity = 0;
		}

		console.log('KEYKEYKEY', process.env.STRIPE_LIVE_SECRET_KEY);

		const stripe = require('stripe')(process.env.STRIPE_LIVE_SECRET_KEY);

		console.log('Requested Amount', paymentAmount);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: paymentAmount, //IN CENTS
			currency: 'usd',
			automatic_payment_methods: {
				enabled: true,
			},
		});

		const { error } = await supabase.from('payment_table').insert({
			uuid: uuid,
			payment_id: paymentIntent.client_secret,
			is_paid: false,
			quantity: selectedQuantity,
		});

		if (error) {
			console.log(error);
			res.status(400).send({ error: error });
		}

		res.status(200).send({ data: paymentIntent.client_secret });
	} catch (e) {
		res.status(400).send({
			error: e.message,
		});
	}
};
