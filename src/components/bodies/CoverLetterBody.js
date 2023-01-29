import React, { createRef, useState } from 'react';

import GenerateCoverLetter from '../data/generation/GenerateCoverLetter';
import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';

const CoverLetterBodies = ({ SetGenerationLoadingStatus, SetSrcDoc, notify }) => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);

	const roleTitleURLRef = createRef();
	const companyURLRef = createRef();
	const userURLRef = createRef();

	const HandleGenerateCoverLetter = async () => {
		setButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);

		let userURL = userURLRef.current.value;
		let companyURL = companyURLRef.current.value;

		if (roleTitleURLRef === '' || companyURLRef === '' || userURLRef === '') {
			setButtonLoadingStatus(false);
			SetGenerationLoadingStatus(false);
			return;
		}

		let data = await GenerateCoverLetter(
			roleTitleURLRef.current.value,
			'https://linkedin.com/in/' + userURL,
			'https://linkedin.com/company/' + companyURL
		);

		if (data) {
			console.log('CoverLetter Generate', data);
			SetSrcDoc(data);
		} else {
			notify({
				type: 'ERROR',
				header: 'Form Error',
				body: "Error — check fields are right and you have enough tokens",
			});
		}

		setButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};
	notify({
		type: 'ERROR',
		header: 'Form Error',
		body: "Error — check fields are right and you have enough tokens",
	});

	return (
		<div className='h-5/6 mt-8 w-full flex flex-col items-center justify-cente relativer'>
			<TextInput
				ref={roleTitleURLRef}
				Placeholder='Role Title'
				AdditionalWrapperStyle='mt-4 w-2/3 shadow-sm'
			/>
			<LabelInput
				ref={companyURLRef}
				Label='https://linkedin.com/company/'
				Placeholder='Company LinkedIn Handle'
				AdditionalWrapperStyle='mt-4 w-2/3 shadow-sm'
			/>
			<LabelInput
				ref={userURLRef}
				Label='https://linkedin.com/in/'
				Placeholder='Your LinkedIn Username'
				AdditionalWrapperStyle='mt-4 w-2/3 shadow-sm'
			/>
			<LoadingButton
				OnClick={HandleGenerateCoverLetter}
				Message='Search'
				IsSecondary={true}
				AdditionalButtonStyle='h-10 w-32 my-4 border-gray-300 border shadow-sm text-primary'
				IsLoading={isButtonLoading}
			/>
		</div>
	);
};

export default CoverLetterBodies;
