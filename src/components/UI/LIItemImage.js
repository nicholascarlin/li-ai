import React, { useState } from 'react';

import { AiOutlineCheck } from 'react-icons/ai';

const LIItemImage = ({ item }) => {
	const [isItemActive, setItemStatus] = useState(true);
	const [isShowMoreActive, setShowMoreStatus] = useState(false);

	return (
		<div className='w-full relative'>
			<div
				onClick={() => {
					setShowMoreStatus(() => {
						return !isShowMoreActive;
					});
				}}
				className='absolute bottom-1 right-2 text-xs text-sub-medium cursor-pointer'>
				{isShowMoreActive ? '(Click Text to Edit) Show Less' : 'Show More'}
			</div>
			<div className='w-full flex justify-between items-center'>
				<div className='flex'>
					<img
						className='w-28 object-contain p-6'
						src={item.image}
						alt='Item Icon'
					/>
					<div className='flex flex-col py-6 pr-4 relative'>
						<div className='font-medium'>{item.title}</div>
						<div className='text-sm'>{item.position || ''}</div>
						<div className='text-sm text-sub-medium'>
							{item.start_date} - {item.end_date}
						</div>
						<div className='text-sm text-sub-medium'>{item.location || ''}</div>
						<p
							contentEditable={isShowMoreActive}
							className={`text-sm ${
								isShowMoreActive ? 'border-primary' : 'line-clamp-3'
							}`}>
							{item.description || ''}
						</p>
					</div>
				</div>
				<div
					onClick={() => {
						setItemStatus(() => {
							return !isItemActive;
						});
					}}
					className={`h-8 w-8 flex-shrink-0 ${
						isItemActive ? 'border-primary bg-primary' : 'border-sub-medium'
					} border-2 rounded-full mr-4 transition-all duration-300 flex items-center justify-center`}>
					{isItemActive ? <AiOutlineCheck className='text-white' /> : null}
				</div>
			</div>
		</div>
	);
};

export default LIItemImage;
