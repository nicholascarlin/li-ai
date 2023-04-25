import { AiOutlineClose } from 'react-icons/ai';
import { FormatTimestamp } from '../utils/FormatData';
import React from 'react';

const DocumentOverlay = ({ SetSrcDoc, SrcDoc, HeaderHeight }) => {
	console.log('SRC DOC', SrcDoc);

	return (
		<div
			className={`w-full h-[calc(100vh)] backdrop-blur-lg flex flex-col items-center`}>
			<AiOutlineClose
				className='text-3xl absolute top-2 right-2 cursor-pointer transition-all duration-200 hover:text-4xl'
				onClick={() => {
					SetSrcDoc(null);
				}}
			/>
			<div className='mt-10 flex lg:flex-row-reverse lg:justify-evenly w-full flex-col'>
				<iframe
					title='Doc Display'
					className='bg-white border shadow-lg text-black h-[calc(66vh)] w-[calc(50vh)]'
					srcDoc={SrcDoc?.cover_letter}
				/>
				<div className='text-gray-500'>
					<div>Company: {SrcDoc?.company_name}</div>
					<div>Position: {SrcDoc?.position_name}</div>
					<div>Created At: {FormatTimestamp(SrcDoc?.created_at)}</div>
					<div>TODO:</div>
					<div>Delete</div>
					<div>Regenerate</div>
					<div>Edit</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentOverlay;
