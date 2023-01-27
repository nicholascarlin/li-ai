import React, { useState } from 'react';

import CoverLetterBodies from '../bodies/CoverLetterBody';
import Frame from '../bodies/Frame';
import Header from '../UI/Header';
import LoadingPage from './LoadingPage';
import ResumeBody from '../bodies/ResumeBody';

const HomePage = () => {
	const [isLoaded, setLoadingStatus] = useState(true);
	const [isGenerationLoading, setGenerationLoadingStatus] = useState(false);
	const [activeWindow, setActiveWindow] = useState('RESUME');
	const [srcDoc, setSrcDoc] = useState(null);

	return isLoaded ? (
		<div className='flex flex-col w-full h-screen pb-4 lg:overflow-y-hidden'>
			<Header SetActiveWindow={setActiveWindow} ActiveWindow={activeWindow} />
			<div className='w-full h-full flex flex-col p-4 gap-4 lg:grid lg:grid-cols-2'>
				{activeWindow === 'RESUME' ? (
					<ResumeBody SetGenerationLoadingStatus={setGenerationLoadingStatus} />
				) : null}
				{activeWindow === 'COVER LETTER' ? (
					<CoverLetterBodies
						SetGenerationLoadingStatus={setGenerationLoadingStatus}
						SetSrcDoc={setSrcDoc}
					/>
				) : null}
				<Frame isSearching={isGenerationLoading} srcDoc={srcDoc} />
			</div>
		</div>
	) : (
		<LoadingPage />
	);
};

export default HomePage;
