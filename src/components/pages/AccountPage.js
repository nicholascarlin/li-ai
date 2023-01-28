import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';

import BackButton from '../UI/buttons/BackButton.js';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/Auth.js';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
	let { user } = useAuth();
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

	useEffect(() => {
		console.log('UE CALLED');
		FetchCoverLetters();
	}, []);

	function getSubstring(str, char1, char2) {
		const char1Index = str.indexOf(char1);
		const char2Index = str.lastIndexOf(char2);
		if (char1Index === -1) return '';
		if (char2Index === -1) return '';
		return str.substring(char1Index, char2Index);
	}

	const FetchCoverLetters = async () => {
		console.log('Fetch Called', user.user.id);
		const { data, error } = await supabase
			.from('li_covers')
			.select()
			.eq('uuid', user.user.id);

		if (error) {
			console.log('ERROR', error);
		}

		if (data) {
			// console.log('DATA', data);
			// let tempData = data;
			let companyName = getSubstring(data[0].cover_letter.split('Dear'));
			console.log('Company Name', companyName);
		}
	};

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
								<div>WOULD GO HERE</div>
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default AccountPage;
