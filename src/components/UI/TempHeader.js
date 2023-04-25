import React, { useEffect, useRef } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { SiSonarcloud } from 'react-icons/si';
import { useAuth } from '../../contexts/Auth';

const TempHeader = ({
	CoverLettersRemaining,
	SetPurchaseOverlayStatus,
	SetHeaderHeight,
}) => {
	let generalIconStyle = 'cursor-pointer text-2xl';

	const ref = useRef(null);
	const { signOut } = useAuth();

	useEffect(() => {
		SetHeaderHeight(ref.current.clientHeight);
	});

	const HandleSignOutClick = () => {
		localStorage.clear();
		signOut();
	};

	return (
		<div
			ref={ref}
			className='w-full flex items-center justify-between bg-primary text-white p-4 relative'>
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
				<MdLogout
					onClick={HandleSignOutClick}
					className={`${generalIconStyle}`}
				/>
			</div>
		</div>
	);
};

export default TempHeader;
