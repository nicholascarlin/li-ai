import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai';
import React, { useState } from 'react';

import BackButton from '../UI/buttons/BackButton.js';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
	const [activeAccordions, setActiveAccordions] = useState([]);

	const navigate = useNavigate();

	const accordionContent = [
		{
			title: 'My Resumes',
			content: [1, 2, 3, 4, 5, 6],
		},
		{
			title: 'My Cover Letters',
			content: [6, 5, 4, 3, 2, 1],
		},
	];

	return (
		<div className='w-screen h-screen relative flex flex-col items-center p-10'>
			<BackButton
				onClick={() => {
					navigate('/');
				}}
			/>
			<div className='text-2xl'>Account</div>
			{accordionContent.map((item, idx) => {
				let itemKey = item + idx;
				return (
					<div
						key={itemKey}
						className='mt-20 w-2/3 flex flex-col border rounded-lg'>
						<div
							onClick={() => {
								setActiveAccordions(() => {
									if (activeAccordions?.includes(itemKey)) {
										setActiveAccordions(() => {
											return activeAccordions.filter(
												(aaItem) => aaItem !== itemKey
											);
										});
									} else {
										return [...activeAccordions, itemKey];
									}
								});
							}}
							className='p-4 bg-primary bg-opacity-50 w-full flex justify-between items-center'>
							<div className=''>{item.title}</div>
							{!activeAccordions?.includes(itemKey) ? (
								<AiFillCaretLeft />
							) : (
								<AiFillCaretDown />
							)}
						</div>
						{activeAccordions?.includes(itemKey) ? (
							<div className='p-8 grid grid-cols-4 gap-4'>
								{item?.content?.map((subItem, subIdx) => {
									return (
										<div
											key={subIdx}
											className='bg-primary w-10 h-10 justify-self-center'>
											{subItem}
										</div>
									);
								})}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default AccountPage;
