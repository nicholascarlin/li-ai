import React, { useEffect } from 'react';

import Token from '../../assets/images/token.png';

const TokenPurchaseItem = ({
	IsActive,
	Value,
	HandleClick,
	Amount,
	Title,
	Subtitle,
}) => {
	useEffect(() => {
		console.log('VALUE IS ACTIVE', IsActive);
	}, []);

	return (
		<div
			onClick={() => {
				HandleClick(Value);
			}}
			className={`flex items-center w-full justify-between border-2 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
				IsActive ? 'border-primary' : 'border-sub-light'
			}`}>
			<div className='flex items-center pr-2'>
				<img
					src={Token}
					alt='Token'
					className='object-contain h-10 w-10 flex-shrink-0 mr-2'
				/>
				<div className='flex flex-col flex-grow'>
					<div className=''>{Title}</div>
					<div className='text-sub-medium text-sm'>{Subtitle}</div>
				</div>
			</div>
			<div>${Amount}</div>
		</div>
	);
};

export default TokenPurchaseItem;
