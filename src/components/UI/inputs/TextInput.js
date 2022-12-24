import { forwardRef } from 'react';

const TextInput = forwardRef((props, ref) => {
	return (
		<div class={`relative mx-auto ${props.AdditionalWrapperStyle}`}>
			<input
				ref={ref}
				type={props.Type}
				inputmode={props.Type}
				id={`floating_outlined ${props.Placeholder}`}
				class={`block px-2.5 pb-2.5 pt-2 w-full text-sm text-sub-dark bg-opacity-0 rounded-lg border border-primary placeholder-shown:border-sub-light appearance-none focus:outline-none focus:ring-0 focus:border-primary peer ${props.AdditionalInputStyle}`}
				placeholder=' '
			/>
			<label
				for={`floating_outlined ${props.Placeholder}`}
				class={`cursor-text absolute text-sm text-primary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 peer-placeholder-shown:text-sub-medium ${props.AdditionalLabelStyle}`}>
				{props.Placeholder || 'Placeholder'}
			</label>
		</div>
	);
});

export default TextInput;
