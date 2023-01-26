import React, { useState } from 'react';

import { AiOutlineCheck } from 'react-icons/ai';

const LIItemImage = ({ item }) => {
	const [isItemActive, setItemStatus] = useState(true);

	return (
		<div
			onClick={() => {
				setItemStatus(() => {
					return !isItemActive;
				});
			}}
			className='w-full'>
			<div className='w-full flex justify-between items-center'>
				<div className='flex'>
					<img
						className='w-28 object-contain p-6'
						src={item.image}
						alt='Item Icon'
					/>
					<div className='flex flex-col py-6'>
						<div className='font-medium'>{item.title}</div>
						<div className='tezt-sm'>Paylocity - Internship</div>
						<div className='tezt-sm text-sub-medium'>
							{item.start_date} - {item.end_date}
						</div>
						<div className='tezt-sm text-sub-medium'>{item.location || ''}</div>
					</div>
				</div>
				<div
					className={`h-8 w-8 ${
						isItemActive ? 'border-primary bg-primary' : 'border-sub-medium'
					} border-2 rounded-full mr-4 transition-all duration-300 flex items-center justify-center`}>
					{isItemActive ? <AiOutlineCheck className='text-white' /> : null}
				</div>
			</div>
		</div>
	);
};

export default LIItemImage;
