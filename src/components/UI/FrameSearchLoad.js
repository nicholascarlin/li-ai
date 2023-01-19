import { useEffect, useState } from 'react';

const FrameSearchLoad = () => {
	const [searchingPhrase, setSearchingPhrase] = useState(0);
	const searchPhrases = [
		'Grabbing your profile..',
		'Searching databases...',
		'Creating Response',
		'Applying AI',
		'Doing a little magic',
		'Running it by QA',
		'Final touches...',
	];
	useEffect(() => {
		const timeOut = Math.random() * 3000 + 1000;
		setTimeout(() => {
			let old = searchingPhrase;
			if (old === 2) {
				old = 0;
			} else {
				old = old + 1;
			}
			setSearchingPhrase(old);
		}, timeOut);
	}, [searchingPhrase]);
	return (
		<div className='w-full mx-auto my-auto flex flex-col'>
			<div className='mx-auto my-auto flex space-x-4'>
				<div className='w-4 h-4 bg-blue-200 rounded-full animate-bounce' />
				<div className='w-4 h-4 bg-blue-400 rounded-full animate-bounce200' />
				<div className='w-4 h-4 bg-blue-600 rounded-full animate-bounce400' />
			</div>
			<div className='mx-auto text-xs font-light font-sans text-gray-300 italic mt-4'>
				{searchPhrases[searchingPhrase]}
			</div>
		</div>
	);
};
export default FrameSearchLoad;
