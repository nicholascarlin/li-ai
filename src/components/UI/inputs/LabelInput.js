import { forwardRef } from 'react';

const LabelInput = forwardRef((props, ref) => {
	return (
		<div className={`flex ${props.AdditionalWrapperStyle}`}>
			<span
				className={`inline-flex items-center px-3 text-sm border border-r-0 border-primary rounded-l-lg bg-primary text-white ${props.AdditionalLabelStyle}`}>
				{props.Label || 'label'}
			</span>
			<input
				ref={ref}
				type={'text'}
				className='rounded-r-lg  block flex-1 min-w-0 w-full text-sm p-2.5 outline-none border border-gray-300 rounded-sm'
				placeholder={props.Placeholder || 'placeholder'}
			/>
		</div>
	);
});

export default LabelInput;
