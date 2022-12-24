import LoadingButton from '../UI/buttons/LoadingButton';
import React from 'react';
import TextInput from '../UI/inputs/TextInput';

const LIURLBody = () => {
	return (
		<div className='w-full h-full flex flex-col items-center'>
			<div>Before we get started, we're going to need your LinkedIn URL</div>
			<div>
				Please copy and paste that link in the box below and press submit when
				ready
			</div>
			<TextInput />
			<LoadingButton Message={'Submit'} />
		</div>
	);
};

export default LIURLBody;
