import { AiOutlineClose } from 'react-icons/ai';
import React from 'react';

const DocPreview = ({ SrcDoc, SetSrcDoc }) => {
	return (
		<div className='w-screen h-screen backdrop-blur-sm rounded-md  fixed flex items-center justify-center z-10 -mt-10'>
			<div className='w-1/2 h-4/5 relative'>
				<AiOutlineClose
					onClick={() => {
						SetSrcDoc(null);
					}}
					className='-top-4 -right-4 absolute h-8 w-8 p-1 bg-white cursor-pointer rounded-full border-red-200 border'
				/>
				<iframe
					className='w-full h-full bg-white border-gray-300 shadow-sm border rounded-md'
					srcDoc={SrcDoc.cover_letter || SrcDoc.resume_data}>
					test
				</iframe>
			</div>
		</div>
	);
};

export default DocPreview;
