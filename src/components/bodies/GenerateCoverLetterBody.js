import React, { createRef, useState } from 'react';
import {
	VerifyLinkedInCompanyURL,
	VerifyLinkedInProfileURL,
} from '../utils/FormInputVerification';

import GenerateCoverLetter from '../data/generation/GenerateCoverLetter';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';

const GenerateCoverLetterBody = ({
	SetGenerationLoadingStatus,
	SetSrcDoc,
	notify,
}) => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);

	const roleTitleURLRef = createRef();
	const companyURLRef = createRef();
	const userURLRef = createRef();

	const HandleGenerateCoverLetter = async () => {
		setButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);

		let userURL = userURLRef.current.value;
		let companyURL = companyURLRef.current.value;

		let isUserURLValid = VerifyLinkedInProfileURL(userURL);

		let isCompanyURLValid = VerifyLinkedInCompanyURL(companyURL);

		if (roleTitleURLRef === '' || !isCompanyURLValid || !isUserURLValid) {
			alert(
				'Please verify inputs and try again. Copy the company URL and your profile URL from your browser'
			);
			setButtonLoadingStatus(false);
			SetGenerationLoadingStatus(false);
			return;
		}

		let data = await GenerateCoverLetter(
			roleTitleURLRef.current.value,
			userURL,
			companyURL
		);

		if (data) {
			console.log('CoverLetter Generate', data);
			SetSrcDoc(data);
		} else {
			notify({
				type: 'ERROR',
				header: 'Form Error',
				body: 'Error — check fields are right and you have enough tokens',
			});
		}

		setButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	return (
		<div className='w-full flex flex-col'>
			<div className='text-lg font-semibold text-gray-500 p-2 px-11'>
				Generate Cover Letter
			</div>
			<TextInput
				ref={roleTitleURLRef}
				Placeholder='Role Title'
				AdditionalWrapperStyle='mt-4 w-2/3 shadow-sm'
			/>
			<TextInput
				ref={companyURLRef}
				Placeholder='Company LinkedIn URL'
				AdditionalWrapperStyle='mt-4 w-2/3 shadow-sm'
			/>
			<TextInput
				ref={userURLRef}
				Placeholder='Your LinkedIn Profile URL'
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

export default GenerateCoverLetterBody;
