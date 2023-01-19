import React, { useEffect, useState } from 'react';

import CoverLetterBodies from '../bodies/CoverLetterBody';
import Header from '../UI/Header';
import LoadingPage from './LoadingPage';
import ResumeBody from '../bodies/ResumeBody';

const HomePage = () => {
	const [isLoaded, setLoadingStatus] = useState(true);
	const [activeWindow, setActiveWindow] = useState('RESUME');

	return isLoaded ? (
		<div className='flex flex-col w-full h-screen pb-4'>
			<Header SetActiveWindow={setActiveWindow} ActiveWindow={activeWindow} />
			<div className='h-full w-full grid grid-cols-2 p-4 gap-4'>
				{/* {!isLIURLSet ? <LIURLBody /> : <ResumeBody />} */}
				{activeWindow === 'RESUME' ? <ResumeBody /> : null}
				{activeWindow === 'COVER LETTER' ? <CoverLetterBodies /> : null}
				<div className='bg-danger h-full w-full'></div>
			</div>
		</div>
	) : (
		<LoadingPage />
	);
};

export default HomePage;
