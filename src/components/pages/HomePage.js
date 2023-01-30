import React, { useEffect, useState } from 'react';

import CoverLetterBodies from '../bodies/CoverLetterBody';
import Frame from '../bodies/Frame';
import Header from '../UI/Header';
import LoadingPage from './LoadingPage';
import ResumeBody from '../bodies/ResumeBody';
import getNumCoverLetters from '../data/getNumCoverLetters';
import { useNotification } from '../../contexts/NotificationProvider';

const HomePage = () => {
	const [isLoaded, setLoadingStatus] = useState(true);
	const [isGenerationLoading, setGenerationLoadingStatus] = useState(false);
	const [activeWindow, setActiveWindow] = useState('RESUME');
	const [srcDoc, setSrcDoc] = useState(null);
	const [numFreeLeft, setNumFreeLeft] = useState(null);
	const notify = useNotification();

	useEffect(() => {
		getNumCoverLetters().then((data) => {
			setNumFreeLeft(data);
		});
	}, [srcDoc, activeWindow]);

	return isLoaded ? (
		<div className='flex flex-col w-full h-screen pb-4 lg:overflow-y-hidden'>
			<div className='left-2 top-2 bg-primary z-[5000] rounded-md absolute px-2 py-2 text-white space-x-2'>
				<span>Cover Letters Remaining:</span>
				<span
					className={`${numFreeLeft && numFreeLeft > 0 && ' text-white'} ${
						numFreeLeft === 0 && ' text-danger'
					}`}>
					{numFreeLeft}
				</span>
			</div>
			<Header SetActiveWindow={setActiveWindow} ActiveWindow={activeWindow} />
			<div className='w-full h-full flex flex-col p-4 gap-4 lg:grid lg:grid-cols-2'>
				{activeWindow === 'RESUME' ? (
					<ResumeBody
						notify={notify}
						SetGenerationLoadingStatus={setGenerationLoadingStatus}
						SetSrcDoc={setSrcDoc}
					/>
				) : null}
				{activeWindow === 'COVER LETTER' ? (
					<CoverLetterBodies
						notify={notify}
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
