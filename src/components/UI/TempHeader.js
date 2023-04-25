import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import React from 'react';
import { SiSonarcloud } from 'react-icons/si';

const TempHeader = ({ CoverLettersRemaining, SetPurchaseOverlayStatus }) => {
	let generalIconStyle = 'cursor-pointer text-2xl';

	return (
		<div className='w-full flex items-center justify-between bg-primary text-white p-4 relative'>
			<div className='flex items-center'>
				<SiSonarcloud className={`text-3xl`} />
				<div className='ml-2 bold'>Applicant AI</div>
				<div className='ml-6 text-xs relative bg-white text-primary p-2 rounded-lg'>
					Cover Letters Remaining: {CoverLettersRemaining || 0}
				</div>
			</div>
			<div className='flex gap-3'>
				<AiOutlineShoppingCart
					onClick={() => SetPurchaseOverlayStatus(true)}
					className={`${generalIconStyle}`}
				/>
				<MdLogout className={`${generalIconStyle}`} />
			</div>
		</div>
	);
};

export default TempHeader;
