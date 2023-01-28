import React, { createRef, useState } from 'react';

import FetchLIProfileData from '../data/FetchLIProfileData';
import GenerateResume from '../data/generation/GenerateResume';
import LIResumeResults from './LIResumeResults';
import LabelInput from '../UI/inputs/LabelInput';
import LoadingButton from '../UI/buttons/LoadingButton';

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

		if (userURLRef.current.value === '') {
			alert('Please provide a valid LinkedIn URL');
			setSearchButtonLoadingStatus(false);
			SetGenerationLoadingStatus(false);
			return;
		}

		let userURL = userURLRef.current.value.toString();

		const profileData = await FetchLIProfileData(
			'https://linkedin.com/in/' + userURL
		);

		setLinkedInURL('https://linkedin.com/in/' + userURL);

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
		<div className='w-full h-5/6 overflow-y-scroll flex flex-col items-center mt-8'>
			<LabelInput
				ref={userURLRef}
				Label='https://linkedin.com/in/'
				Placeholder='Your LinkedIn Username'
				AdditionalWrapperStyle='mt-4 w-2/3'
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
