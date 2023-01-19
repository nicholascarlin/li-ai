import { ImSpinner8 } from 'react-icons/im';
import React from 'react';

const LoadingPage = () => {
	return (
		<div className='w-screen h-screen flex flex-col space-y-4 items-center justify-center'>
			<ImSpinner8 className='animate-spin text-8xl text-primary' />
			<div className='text-sub-medium text-sm'>Loading...</div>
		</div>
	);
};

export default LoadingPage;
