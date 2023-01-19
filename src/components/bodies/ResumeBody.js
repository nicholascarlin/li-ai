import React, { createRef, useState } from 'react';

import FetchLIProfileData from '../data/FetchLIProfileData';
import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';

const ResumeBody = ({ SetGenerationLoadingStatus }) => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);
	const [liProfileData, setLIProfileData] = useState(null);
	const userURLRef = createRef();

	const HandleGenerateResume = async () => {
		setButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);
		console.log('Search');
		const profileData = await FetchLIProfileData(
			'https://linkedin.com/in/' + userURLRef.current.value
		);
		console.log('Returned Profile Data', profileData);
		setLIProfileData(profileData);
		setButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	return (
		<div className='h-full w-full flex flex-col items-center justify-center'>
			<LabelInput
				ref={userURLRef}
				Label='https://linkedin.com/in/'
				Placeholder='Your LinkedIn Username'
				AdditionalWrapperStyle='mt-4 w-2/3'
			/>
			<LoadingButton
				OnClick={HandleGenerateResume}
				Message='Search'
				IsSecondary={true}
				AdditionalButtonStyle='h-10 w-32 my-4'
				IsLoading={isButtonLoading}
			/>
		</div>
	);
};

export default ResumeBody;
