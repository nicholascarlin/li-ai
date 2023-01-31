import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import FetchStripeSecret from '../data/FetchStripeSecret';
import { ImSpinner8 } from 'react-icons/im';
import LoadingButton from '../UI/buttons/LoadingButton';
import TokenPurchaseItem from './TokenPurchaseItem';
import { loadStripe } from '@stripe/stripe-js';

// Publishable Key

const stripePromise = loadStripe(
	'pk_test_51MVNbqFN14JmEY5d3NzRjKgI6auo9rRG8rlXc3p8l3z4kEmpVTAIe145QzdYxJyLoftwzDUl4Zxngs6FIlOH5FJu00ofY2w4OX'
);

const PurchaseOverlay = ({ SetOverlayStatus }) => {
	const [clientSecret, setClientSecret] = useState(null);
	const [paymentStage, setPaymentStage] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		if (paymentStage === 1) {
			HandleFetchStripeSecret();
		}
	}, [paymentStage]);

	const HandleFetchStripeSecret = async () => {
		const tempClientSecret = await FetchStripeSecret(selectedOption);
		setClientSecret(tempClientSecret);
	};

	const HandleOptionClick = (value) => {
		setSelectedOption(value);
	};

	const HandleNextClick = () => {
		if (paymentStage === 0 && selectedOption !== null) {
			setPaymentStage(1);
		}
	};

	return (
		<div className='w-screen h-screen backdrop-blur-sm rounded-md  fixed flex items-center justify-center z-10 -mt-10'>
			<div className='w-1/2 h-4/5 relative'>
				<AiOutlineClose
					onClick={() => {
						SetOverlayStatus(null);
					}}
					className='-top-4 -right-4 absolute h-8 w-8 p-1 bg-white cursor-pointer rounded-full border-red-200 border'
				/>
				<div className='w-full h-full bg-white border-gray-300 shadow-sm border rounded-md p-4'>
					{paymentStage === 0 ? (
						<div className='h-full flex flex-col items-center justify-around'>
							<div className='space-y-2'>
								<TokenPurchaseItem
									HandleClick={HandleOptionClick}
									IsActive={selectedOption === 0}
									Value={0}
									Amount={'2.99'}
									Title={'5 Cover Letter Credits'}
									Subtitle={
										'Adds five additional cover letter credits to your account'
									}
								/>
								<TokenPurchaseItem
									HandleClick={HandleOptionClick}
									IsActive={selectedOption === 1}
									Value={1}
									Amount={'4.99'}
									Title={'10 Cover Letter Credits'}
									Subtitle={
										'Adds ten additional cover letter credits to your account'
									}
								/>
								<TokenPurchaseItem
									HandleClick={HandleOptionClick}
									IsActive={selectedOption === 2}
									Value={2}
									Amount={'7.99'}
									Title={'20 Cover Letter Credits'}
									Subtitle={
										'Adds twenty additional cover letter credits to your account'
									}
								/>
							</div>
							<LoadingButton
								Message={'Next'}
								IsSecondary={true}
								OnClick={HandleNextClick}
								IsInactive={selectedOption === null}
								AdditionalButtonStyle='w-full'
							/>
						</div>
					) : null}
					{paymentStage === 1 ? (
						clientSecret && stripePromise ? (
							<Elements stripe={stripePromise} options={{ clientSecret }}>
								<CheckoutForm SelectedProduct={selectedOption} />
							</Elements>
						) : (
							<div className='w-full h-full flex flex-col items-center justify-center'>
								<ImSpinner8 className='text-4xl text-primary animate-spin' />
							</div>
						)
					) : null}
				</div>
			</div>
		</div>
	);
};

export default PurchaseOverlay;
