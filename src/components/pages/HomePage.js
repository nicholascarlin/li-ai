import React, { useEffect, useState } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import CoverLetterBodies from '../bodies/CoverLetterBody';
import DocDisplayBody from '../bodies/DocDisplayBody';
import DocumentOverlay from '../bodies/DocumentOverlay';
import Frame from '../bodies/Frame';
import GenerateCoverLetterBody from '../bodies/GenerateCoverLetterBody';
import Header from '../UI/Header';
import LoadingPage from './LoadingPage';
import PurchaseOverlay from '../payment/PurchaseOverlay';
import ResumeBody from '../bodies/ResumeBody';
import TempHeader from '../UI/TempHeader';
import TempHomePage from './TempHomePage';
import getNumCoverLetters from '../data/getNumCoverLetters';
import { useNotification } from '../../contexts/NotificationProvider';

const HomePage = () => {
	const [isLoaded, setLoadingStatus] = useState(true);
	const [isGenerationLoading, setGenerationLoadingStatus] = useState(false);
	const [activeWindow, setActiveWindow] = useState('COVER LETTER');
	const [srcDoc, setSrcDoc] = useState(null);
	const [numFreeLeft, setNumFreeLeft] = useState(null);
	const [isPurchaseOverlayActive, setPurchaseOverlayStatus] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(null);

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

			<TempHeader
				CoverLettersRemaining={numFreeLeft}
				SetPurchaseOverlayStatus={setPurchaseOverlayStatus}
				SetHeaderHeight={setHeaderHeight}
			/>
			<div>
				{srcDoc ? (
					<DocumentOverlay
						SetSrcDoc={setSrcDoc}
						SrcDoc={srcDoc}
						HeaderHeight={headerHeight}
					/>
				) : null}

				<GenerateCoverLetterBody
					notify={notify}
					SetGenerationLoadingStatus={setGenerationLoadingStatus}
					SetSrcDoc={setSrcDoc}
				/>
				<DocDisplayBody SetSrcDoc={setSrcDoc} />
			</div>
		</div>
	) : (
		<LoadingPage />
	);
};

export default HomePage;
