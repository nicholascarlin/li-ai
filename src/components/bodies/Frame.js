import FrameSearchLoad from '../UI/FrameSearchLoad';
import React from 'react';

const Frame = ({ isSearching, srcDoc }) => {
	return (
		<div className='w-full flex h-full'>
			<div className='mx-auto my-auto md:w-4/5 w-full h-5/6 flex rounded-sm border border-gray-200 bg-white text-sm'>
				{isSearching && (
					<div className='my-auto mx-auto'>
						<FrameSearchLoad />
					</div>
				)}
				{!isSearching && (
					<iframe
						className='w-full h-full text-xs'
						srcDoc={srcDoc && srcDoc}></iframe>
				)}
			</div>
		</div>
	);
};

export default Frame;
