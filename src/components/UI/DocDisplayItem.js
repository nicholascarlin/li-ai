import { FormatTimestamp } from '../utils/FormatData';
import React from 'react';
export function DocDisplayItem({ item, idx, SetSrcDoc }) {
	return (
		<div
			onClick={() => SetSrcDoc(item)}
			key={item + idx}
			className='bg-white border shadow-lg w-56 cursor-pointer hover:shadow-2xl transition-all duration-200'>
			<iframe
				title='Doc Display'
				className='w-full cursor-pointer'
				srcDoc={item?.cover_letter}
			/>
			<div className='text-left p-2 border-t'>
				<div className='font-semibold truncate'>{item?.company_name}</div>
				<div className='text-sm truncate text-gray-500'>
					{FormatTimestamp(item?.created_at)}
				</div>
			</div>
		</div>
	);
}
