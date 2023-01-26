import React, { createRef, useState } from 'react';

import GenerateCoverLetter from '../data/generation/GenerateCoverLetter';
import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';

const CoverLetterBodies = ({ SetGenerationLoadingStatus }) => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);
	const [coverLetter, setCoverLetter] = useState(null);
	const roleTitleURLRef = createRef();
	const companyURLRef = createRef();
	const userURLRef = createRef();

	const HandleGenerateCoverLetter = () => {
		setButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);

		if (roleTitleURLRef === '' || companyURLRef === '' || userURLRef === '') {
			setButtonLoadingStatus(false);
			SetGenerationLoadingStatus(false);
			return;
		}

		GenerateCoverLetter(
			roleTitleURLRef.current.value,
			'https://linkedin.com/in/' + companyURLRef.current.value,
			'https://linkedin.com/company/' + userURLRef.current.value
		).then((data) => {
			console.log('CoverLetter Generate', data);
			setCoverLetter(data);
		});

		setButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	return (
		<div className='h-full w-full flex flex-col items-center justify-center'>
			<TextInput
				ref={roleTitleURLRef}
				Placeholder='Role Title'
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
