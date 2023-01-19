import React, { createRef, useState } from 'react';

import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';

const CoverLetterBodies = ({ SetGenerationLoadingStatus }) => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);
	const roleTitleURLRef = createRef();
	const companyURLRef = createRef();
	const userURLRef = createRef();

	const HandleGenerateCoverLetter = () => {
		setButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);
		console.log('Gen Cover Letter');
		setButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	return (
		<div className='h-full w-full flex flex-col items-center justify-center -mt-20'>
			<TextInput
				ref={roleTitleURLRef}
				Placeholder='Company LinkedIn Handle'
				AdditionalWrapperStyle='mt-4 w-2/3'
			/>
			<LabelInput
				ref={companyURLRef}
				Label='https://linkedin.com/company/'
				Placeholder='Company LinkedIn Handle'
				AdditionalWrapperStyle='mt-4 w-2/3'
			/>
			<LabelInput
				ref={userURLRef}
				Label='https://linkedin.com/in/'
				Placeholder='Your LinkedIn Username'
				AdditionalWrapperStyle='mt-4 w-2/3'
			/>
			<LoadingButton
				OnClick={HandleGenerateCoverLetter}
				Message='Search'
				IsSecondary={true}
				AdditionalButtonStyle='h-10 w-32 my-4'
				IsLoading={isButtonLoading}
			/>
		</div>
	);
};

export default CoverLetterBodies;
