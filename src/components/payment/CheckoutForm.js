import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

import AddCoverLetters from '../data/AddCoverLetters';
import LoadingButton from '../UI/buttons/LoadingButton';
import Token from '../../assets/images/token.png';
import { useNotification } from '../../contexts/NotificationProvider';

const CheckoutForm = ({ SelectedProduct }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	let notify = useNotification();

	const TokensToAdd = 5
		? SelectedProduct === 0
		: 10
		? SelectedProduct === 1
		: 20
		? SelectedProduct === 2
		: null;

	const HandleSubmit = async () => {
		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/success`,
			},
			redirect: 'if_required',
		});

		console.log('BEFORE IF', paymentIntent);

		if (error) {
			console.log('WAS AN ERROR');
			setMessage(error.message);
		} else if (paymentIntent && paymentIntent.status === 'suceeded') {
			// Increment
			console.log('WAS SUCCESFUL');
			setMessage(`Payment Status: ${paymentIntent.status}`);
			console.log('ADD CALLED');
			let res = AddCoverLetters(TokensToAdd);
			console.log('ADD DONE', res);

			notify({
				type: 'SUCCESS',
				header: 'Payment Succesful',
				body: 'If tokens do not show, wait a second and refresh',
			});
		} else {
			setMessage('Unexpected State');
		}

		setIsProcessing(false);
	};

	return (
		<form
			id='payment-form'
			onSubmit={HandleSubmit}
			className='w-full h-full flex flex-col items-center justify-around'>
			{SelectedProduct === 0
				? DisplayItemPrice('5 Tokens', '2.99')
				: SelectedProduct === 1
				? DisplayItemPrice('10 Tokens', '4.99')
				: SelectedProduct === 2
				? DisplayItemPrice('20 Tokens', '7.99')
				: null}

			<PaymentElement className='w-full' />

			<LoadingButton
				id='submit'
				IsLoading={isProcessing}
				OnClick={HandleSubmit}
				Message={isProcessing ? 'Processing...' : 'Pay Now'}
				AdditionalButtonStyle='mx-auto w-full py-2 mt-8'
			/>
			{message && (
				<div className='mx-auto text-center w-full mt-1 text-sm text-danger font-medium'>
					{message}
				</div>
			)}
		</form>
	);
};

function DisplayItemPrice(item, price) {
	return (
		<div className='flex flex-col items-center space-y-2'>
			<img src={Token} alt='Token' className='object-contain h-16 w-16' />
			<div className='text-xl font-medium'>{item}</div>
			<div>${price}</div>
			<div className='mt-8 text-xs text-sub-light'>
				Payments processed through Stripe, Inc.
			</div>
		</div>
	);
}

export default CheckoutForm;
