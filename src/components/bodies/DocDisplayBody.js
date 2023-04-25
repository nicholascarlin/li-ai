import React, { useEffect, useState } from 'react';

import { DocDisplayItem } from '../UI/DocDisplayItem';
import SortCoverLettersByDropDown from '../UI/SortCoverLettersByDropDown';
import { supabase } from '../../supabaseClient';

let dropdownItemEnum = {
	DateDesc: 0,
	DateAsc: 1,
};

const DocDisplayBody = () => {
	const [coverLetters, setCoverLetters] = useState([]);
	const [coverLetterSortOrder, setCoverLetterSortOrder] = useState(
		dropdownItemEnum.DateDesc
	);

	useEffect(() => {
		getCurrCovers();
	}, [coverLetterSortOrder]);

	const getCurrCovers = async () => {
		const { data, error } = await supabase.from('li_covers').select('*');

		const sortedData =
			coverLetterSortOrder === dropdownItemEnum.DateDesc
				? data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
				: coverLetterSortOrder === dropdownItemEnum.DateAsc
				? data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
				: null;

		setCoverLetters(sortedData);
		console.log(data, error);
	};

	return (
		<div className='w-full'>
			<div className='p-2 pb-1 px-11 flex flex-row items-center justify-between'>
				<div className='text-lg font-semibold text-gray-500'>My Docs</div>
				<SortCoverLettersByDropDown
					dropdownItemEnum={dropdownItemEnum}
					setCoverLetterSortOrder={setCoverLetterSortOrder}
				/>
			</div>
			<hr />
			<div className='p-3 w-full flex flex-row items-center justify-evenly flex-wrap gap-3'>
				{coverLetters.map((item, idx) => {
					console.log('COVER LETTER:', item);
					return <DocDisplayItem item={item} idx={idx} />;
				})}
			</div>
		</div>
	);
};

export default DocDisplayBody;
