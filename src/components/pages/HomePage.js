import React, { useEffect, useState } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import CoverLetterBodies from '../bodies/CoverLetterBody';
import Frame from '../bodies/Frame';
import Header from '../UI/Header';
import LoadingPage from './LoadingPage';
import PurchaseOverlay from '../payment/PurchaseOverlay';
import ResumeBody from '../bodies/ResumeBody';
import getNumCoverLetters from '../data/getNumCoverLetters';
import { useNotification } from '../../contexts/NotificationProvider';

const HomePage = () => {
	const [isLoaded, setLoadingStatus] = useState(true);
	const [isGenerationLoading, setGenerationLoadingStatus] = useState(false);
	const [activeWindow, setActiveWindow] = useState('COVER LETTER');
	const [srcDoc, setSrcDoc] = useState(null);
	const [numFreeLeft, setNumFreeLeft] = useState(null);
	const [isPurchaseOverlayActive, setPurchaseOverlayStatus] = useState(false);

	const notify = useNotification();

	useEffect(() => {
		getNumCoverLetters().then((data) => {
			setNumFreeLeft(data);
		});
	}, [srcDoc, activeWindow]);

	return isLoaded ? (
		<div className='flex flex-col w-full h-screen pb-4 lg:overflow-y-hidden'>
			{isPurchaseOverlayActive ? (
				<PurchaseOverlay SetOverlayStatus={setPurchaseOverlayStatus} />
			) : null}
			<div className='left-2 top-2 absolute flex items-center'>
				<div className='bg-primary z-[5000] rounded-md md:px-2 md:py-2 px-1 py-1 text-white space-x-2 relative'>
					<span>Cover Letters Remaining:</span>
					<span
						className={`${numFreeLeft && numFreeLeft > 0 && ' text-white'} ${
							numFreeLeft === 0 && ' text-danger'
						}`}>
						{numFreeLeft}
					</span>
				</div>
				<AiOutlineShoppingCart
					onClick={() => {
						setPurchaseOverlayStatus(true);
					}}
					className='text-3xl text-primary ml-2 cursor-pointer'
				/>
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
