import LIItemImage from '../UI/LIItemImage';
import React from 'react';

let sectionWrapperStyle =
	'w-2/3 flex flex-col items-center divide-y divide-sub-light';
let sectionHeaderStyle = 'w-full text-xl font-bold mb-1';

const LIResumeResults = ({ LIProfileData }) => {
	return (
		<div className='w-full flex flex-col items-center'>
			<>{HandleExperiences(LIProfileData.experiences)}</>
			<>{HandleEducation(LIProfileData.education)}</>
		</div>
	);
};

function HandleEducation(education) {
	return (
		<div className={sectionWrapperStyle}>
			<div className={sectionHeaderStyle}>Education</div>
			{education?.map((item, idx) => {
				return (
					<LIItemImage
						key={item + idx}
						item={{
							image: item.logo_url,
							title: item.school,
							start_date: item.starts_at.year,
							end_date: item.ends_at.year,
							description: item.description,
						}}
					/>
				);
			})}
		</div>
	);
}

function HandleExperiences(experiences) {
	return (
		<div className={sectionWrapperStyle}>
			<div className={sectionHeaderStyle}>Experiences</div>
			{experiences?.map((item, idx) => {
				console.log('Experience', item);
				return (
					<LIItemImage
						key={item + idx}
						item={{
							image: item.logo_url,
							title: item.school,
							start_date: item.starts_at.year,
							end_date: item.ends_at.year,
							description: item.description,
						}}
					/>
				);
			})}
		</div>
	);
}

export default LIResumeResults;
