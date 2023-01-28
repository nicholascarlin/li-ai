import { FormatDate } from '../utils/FormatData';
import LIItemImage from '../UI/LIItemImage';
import LoadingButton from '../UI/buttons/LoadingButton';
import React from 'react';

let sectionWrapperStyle =
	'w-2/3 flex flex-col items-center divide-y divide-sub-light';
let sectionHeaderStyle = 'w-full text-xl font-bold mb-1';

const LIResumeResults = ({
	Experiences,
	SetExperiences,
	SelectedExperiences,
	Education,
	SetEducation,
	SelectedEducation,
	Accomplishments,
	SetAccomplishments,
	SelectedAccomplishments,
	HandleGenerateResume,
	isButtonLoading,
}) => {
	return (
		<div className='w-full flex flex-col items-center space-y-6'>
			<>{HandleExperiences(Experiences, SetExperiences, SelectedExperiences)}</>
			<>{HandleEducation(Education, SetEducation, SelectedEducation)}</>
			<>
				{HandleAccomplishments(
					Accomplishments,
					SetAccomplishments,
					SelectedAccomplishments
				)}
			</>
			<LoadingButton
				OnClick={HandleGenerateResume}
				Message='Generate'
				IsSecondary={true}
				AdditionalButtonStyle='w-32 my-4 py-2'
				IsLoading={isButtonLoading}
			/>
		</div>
	);
};

function HandleEducation(Education, SetEducation, SelectedEducation) {
	const HandleEducationToggle = (item) => {
		console.log('Edu Toggled');
		let tempArray = [...SelectedEducation];

		let isPresent = tempArray.some((el) => el === item);

		if (isPresent) {
			tempArray = tempArray.filter(function (obj) {
				return obj !== item;
			});
		} else {
			tempArray = [...tempArray, item];
		}

		SetEducation(tempArray);
	};

	return (
		<div className={sectionWrapperStyle}>
			<div className={sectionHeaderStyle}>Education</div>
			{Education?.map((item, idx) => {
				// console.log('Education', item);
				return (
					<LIItemImage
						key={item + idx}
						HandleItemToggle={HandleEducationToggle}
						Item={item}
						item={{
							image: item.logo_url,
							position: item.field_of_study,
							title: item.school,
							date: `${item.starts_at.year} - ${item.ends_at.year}`,
							description: item.description,
						}}
					/>
				);
			})}
		</div>
	);
}

function HandleExperiences(Experiences, SetExperiences, SelectedExperiences) {
	const HandleExperiencesToggle = (item) => {
		console.log('Exp Tog');
		let tempArray = [...SelectedExperiences];
		console.log('item', item);
		let isPresent = tempArray.some((el) => el === item);

		if (isPresent) {
			tempArray = tempArray.filter(function (obj) {
				return obj !== item;
			});
		} else {
			tempArray = [...tempArray, item];
		}
		console.log('TEMP ARRAY', tempArray);
		SetExperiences(tempArray);
	};

	return (
		<div className={sectionWrapperStyle}>
			<div className={sectionHeaderStyle}>Experiences</div>
			{Experiences?.map((item, idx) => {
				// console.log('Experience', item);
				return (
					<LIItemImage
						key={item + idx}
						HandleItemToggle={HandleExperiencesToggle}
						Item={item}
						item={{
							image: item.logo_url,
							position: item.title,
							title: item.company,
							date: `${FormatDate(
								item.starts_at.year,
								item.starts_at.month
							)} - ${FormatDate(item.ends_at.year, item.ends_at.month)}`,
							description: item.description,
						}}
					/>
				);
			})}
		</div>
	);
}

function HandleAccomplishments(
	Accomplishments,
	SetAccomplishments,
	SelectedAccomplishments
) {
	const HandleAccomplishmentsToggle = (item) => {
		console.log('ACCOMP Toggle');
		let tempArray = [...SelectedAccomplishments];

		let isPresent = tempArray.some((el) => el === item);

		if (isPresent) {
			tempArray = tempArray.filter(function (obj) {
				return obj !== item;
			});
		} else {
			tempArray = [...tempArray, item];
		}

		SetAccomplishments(tempArray);
	};

	return (
		<div className={sectionWrapperStyle}>
			<div className={sectionHeaderStyle}>Accomplishments</div>
			{Accomplishments?.map((item, idx) => {
				// console.log('Experience', item);
				return (
					<LIItemImage
						key={item + idx}
						HandleItemToggle={HandleAccomplishmentsToggle}
						Item={item}
						item={{
							image: 'N/A',
							position: item.issuer,
							title: item.title,
							date: FormatDate(item.issued_on.year, item.issued_on.month),
							description: item.description,
						}}
					/>
				);
			})}
		</div>
	);
}

export default LIResumeResults;
