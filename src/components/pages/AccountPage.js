import {
	AiFillCaretDown,
	AiFillCaretLeft,
	AiOutlineClose,
} from 'react-icons/ai';
import React, { useEffect, useState } from 'react';

import BackButton from '../UI/buttons/BackButton.js';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
	const [activeAccordions, setActiveAccordions] = useState([]);

	const navigate = useNavigate();

	const [prevResumes, setPrevResumes] = useState(null);
	const [prevCovers, setPrevCovers] = useState(null);

	const checkAuth = async () => {
		const isAuthd = await supabase.auth.getSession();
		console.log(isAuthd);
		if (isAuthd.data.session) {
			console.log(isAuthd.data);
		}
	};

	const getCurrResumes = async () => {
		const { data, error } = await supabase.from('li_resumes').select('*');
		console.log(data, error);
		setPrevResumes(data);
		console.log(error);
	};

	const getCurrCovers = async () => {
		const { data, error } = await supabase.from('li_covers').select('*');
		console.log(data, error);
		setPrevCovers(data);
		console.log(error);
	};

	useEffect(() => {
		checkAuth().then(async () => {
			await getCurrResumes();
			await getCurrCovers();
		});
	}, []);

	const accordionContent = [
		{
			title: 'My Resumes',
			content: prevResumes,
		},
		{
			title: 'My Cover Letters',
			content: prevCovers,
		},
	];

	const HandleDelete = () => {
		// eslint-disable-next-line no-restricted-globals
		let isOK = confirm(
			'Are you sure you want to delete this? This action cannot be undone'
		);
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
								{item?.content?.map((subItem, subIDX) => {
									console.log('ITEM', subItem);
									return (
										<div className='w-40 h-40 border rounded-lg relative'>
											<iframe
												key={subIDX + subItem}
												className='text-xs object-contain cursor-pointer w-full h-full'
												srcDoc={
													subItem?.resume_data || subItem?.cover_letter
												}></iframe>
											<AiOutlineClose
												onClick={() => {
													HandleDelete();
												}}
												className='absolute -top-3 -right-3 rounded-full bg-white border-primary border h-6 w-6 p-1 cursor-pointer'
											/>
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
