import React, { createRef, useState } from 'react';

import FetchLIProfileData from '../data/FetchLIProfileData';
import GenerateResume from '../data/generation/GenerateResume';
import LIResumeResults from './LIResumeResults';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';
import { VerifyLinkedInProfileURL } from '../utils/FormInputVerification';

const ResumeBody = ({ SetGenerationLoadingStatus, SetSrcDoc }) => {
	const [isSearchButtonLoading, setSearchButtonLoadingStatus] = useState(false);
	const [isGenerateButtonLoading, setGenerateButtonLoadingStatus] =
		useState(false);
	const [liProfileData, setLIProfileData] = useState(null);
	const userURLRef = createRef();

	const [experiences, setExperiences] = useState(null);
	const [education, setEducation] = useState(null);
	const [accomplishments, setAccomplishments] = useState(null);
	const [person, setPerson] = useState(null);
	const [linkedInURL, setLinkedInURL] = useState(null);

	const [selectedExperiences, setSelectedExperiences] = useState(null);
	const [selectedEducation, setSelectedEducation] = useState(null);
	const [selectedAccomplishments, setSelectedAccomplishments] = useState(null);

	const HandleUserSearch = async () => {
		setSearchButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);

		let userURL = userURLRef.current.value.toString();
		let isProfileURLValid = VerifyLinkedInProfileURL(userURL);

		if (!isProfileURLValid) {
			alert('Please provide a valid LinkedIn URL');
			setSearchButtonLoadingStatus(false);
			SetGenerationLoadingStatus(false);
			return;
		}

		const profileData = await FetchLIProfileData(userURL);

		setLinkedInURL(userURL);

		setLIProfileData(profileData);
		setExperiences(profileData.experiences);
		setEducation(profileData.education);
		setAccomplishments(profileData.accomplishment_honors_awards);
		setSelectedExperiences(profileData.experiences);
		setSelectedEducation(profileData.education);
		setSelectedAccomplishments(profileData.accomplishment_honors_awards);

		const tempPerson = {};
		tempPerson.city = profileData.city;
		tempPerson.full_name = profileData.full_name;
		tempPerson.summary = profileData.summary;
		tempPerson.profile_pic = profileData.profile_pic_url;
		setPerson(tempPerson);

		setSearchButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	const HandleGenerateResume = async () => {
		setGenerateButtonLoadingStatus(true);
		SetGenerationLoadingStatus(true);
		console.log(
			'CALLED',
			selectedAccomplishments,
			selectedEducation,
			selectedExperiences,
			person
		);

		const searchRes = await GenerateResume(
			selectedExperiences,
			selectedEducation,
			selectedAccomplishments,
			person,
			linkedInURL
		);
		console.log('search res', searchRes);
		SetSrcDoc(searchRes);

		setGenerateButtonLoadingStatus(false);
		SetGenerationLoadingStatus(false);
	};

	return (
		<div className='w-full flex flex-col items-center md:mt-8'>
			<TextInput
				ref={userURLRef}
				Placeholder='Your LinkedIn Profile URL'
				AdditionalWrapperStyle='mt-4 w-2/3 z-10'
			/>
			<LoadingButton
				OnClick={HandleUserSearch}
				Message='Search'
				IsSecondary={true}
				AdditionalButtonStyle='w-32 my-4 py-2'
				IsLoading={isSearchButtonLoading}
			/>
			{liProfileData ? (
				<LIResumeResults
					Experiences={experiences}
					SelectedExperiences={selectedExperiences}
					SetExperiences={setSelectedExperiences}
					Education={education}
					SelectedEducation={selectedEducation}
					SetEducation={setSelectedEducation}
					Accomplishments={accomplishments}
					SelectedAccomplishments={selectedAccomplishments}
					SetAccomplishments={setSelectedAccomplishments}
					HandleGenerateResume={HandleGenerateResume}
					isButtonLoading={isGenerateButtonLoading}
				/>
			) : null}
		</div>
	);
};

export default ResumeBody;
