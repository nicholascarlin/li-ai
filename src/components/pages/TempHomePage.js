import DocDisplayBody from '../bodies/DocDisplayBody';
import GenerateCoverLetterBody from '../bodies/GenerateCoverLetterBody';
import React from 'react';
import TempHeader from '../UI/TempHeader';

const TempHomePage = () => {
	return (
		<div className='h-screen w-screen'>
			<TempHeader />
			<GenerateCoverLetterBody />
			<DocDisplayBody />
		</div>
	);
};

export default TempHomePage;
