import React from 'react';

const LIResumeResults = ({ LIProfileData }) => {
	return (
		<div>
			<div>test</div>
			<div>{HandleEducation(LIProfileData.education)}</div>
		</div>
	);
};

const HandleEducation = ({ education }) => {
	return (
		<div>
			{education?.map((item, idx) => {
				console.log('ITEM', item);
				return (
					<div key={item + idx}>
						<div>test</div>
					</div>
				);
			})}
		</div>
	);
};

export default LIResumeResults;
