import React, { createRef, useState } from 'react';

import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';

const LIURLBody = () => {
	const urlRef = createRef();
	const [isLoading, setLoadingStatus] = useState(false);

	const HandleSubmit = () => {
		setLoadingStatus(true);
		console.log('Submit', urlRef.current.value);
		setLoadingStatus(false);
	};

	return (
		<div className='w-full h-full flex flex-col items-center space-y-4 mt-8'>
			<div className='text-xl font-medium'>
				Before we get started, we're going to need your LinkedIn URL
			</div>
			<div className='text-sm'>
				Please copy and paste that link in the box below and press submit when
				ready
			</div>
			<TextInput AdditionalWrapperStyle='w-1/3' ref={urlRef} />
			<LoadingButton
				OnClick={HandleSubmit}
				Message={'Submit'}
				AdditionalButtonStyle='px-4'
				IsLoading={isLoading}
			/>
		</div>
	);
};

export default LIURLBody;
