import { createClient } from '@supabase/supabase-js';
import { validateJWT } from './utils';

module.exports = async (req, res) => {
	// const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY, {
	//     apiVersion: '2022-08-01'
	// })

	// const toReturn = process.env.STRIPE_TEST_SECRET_KEY;

	try {
		console.log('HITHIT');
		const selectedOption = req.body;

		const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
		const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
		const supabase = createClient(supabaseUrl, supabaseKey);

		let auth = req.headers.authorization;
		const uuid = validateJWT(auth, res);

		let paymentAmount;

		switch (selectedOption) {
			case 0:
				paymentAmount = 299;
				break;

			case 1:
				paymentAmount = 499;
				break;

			case 2:
				paymentAmount = 799;
				break;

			default:
				paymentAmount = 0;
		}

		const stripe = require('stripe')(
			'sk_test_51MVNbqFN14JmEY5dmjMmQRSPfbqqNO7c30tYjHLIwu4ka80Xik78Ca0LLdekQLlJyMy4B3wTXlLT7CJlY1pR476100rVw46tPZ'
		);

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
			quantity: paymentAmount,
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
