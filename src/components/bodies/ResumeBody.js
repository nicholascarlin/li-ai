import React, { createRef, useState } from 'react';

import FetchLIProfileData from '../data/FetchLIProfileData';
import LIResumeResults from './LIResumeResults';
import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';

const ResumeBody = ({ SetGenerationLoadingStatus }) => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);
	const [liProfileData, setLIProfileData] = useState(null);
	const userURLRef = createRef();

	const HandleGenerateResume = async () => {
		setButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);

		console.log('Search', userURLRef.current.value);
		// const profileData = await FetchLIProfileData(
		// 	'https://linkedin.com/in/' + userURLRef.current.value
		// );
		const profileData = await FetchLIProfileData(
			'https://www.linkedin.com/in/nicholas-carlin-99489a198/'
		);

		console.log('Returned Profile Data', profileData);
		setLIProfileData(profileData);
		setButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	return (
		<div className='w-full h-5/6 overflow-y-scroll flex flex-col items-center mt-8'>
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
			{liProfileData ? <LIResumeResults LIProfileData={liProfileData} /> : null}
		</div>
	);
};

export default ResumeBody;
