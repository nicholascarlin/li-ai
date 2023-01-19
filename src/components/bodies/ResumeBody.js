import React, { createRef, useState } from 'react';

import FetchLIProfileData from '../data/FetchLIProfileData';
import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';

const ResumeBody = () => {
	const [isButtonLoading, setButtonLoadingStatus] = useState(false);
	const [liProfileData, setLIProfileData] = useState(null);
	const urlRef = createRef();

	const HandleSearch = async () => {
		setButtonLoadingStatus(true);
		console.log('Search');
		const profileData = await FetchLIProfileData(
			'https://linkedin.com/in/' + urlRef.current.value
		);
		console.log('Returned Profile Data', profileData);
		setLIProfileData(profileData);
		setButtonLoadingStatus(false);
	};

	return (
		<div className='h-full w-full flex flex-col items-center justify-center -mt-20'>
			<LabelInput
				ref={urlRef}
				Label='https://linkedin.com/in/'
				Placeholder='Your LinkedIn Username'
				AdditionalWrapperStyle='mt-4 w-2/3'
			/>
			<LoadingButton
				OnClick={HandleSearch}
				Message='Search'
				IsSecondary={true}
				AdditionalButtonStyle='h-10 w-32 my-4'
				IsLoading={isButtonLoading}
			/>
		</div>
	);
};

export default ResumeBody;
