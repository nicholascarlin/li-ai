import { ImSpinner8 } from 'react-icons/im';

const LoadingButton = ({
	AdditionalButtonStyle,
	AdditionalLoadingStyle,
	IsSecondary,
	IsLoading,
	OnClick,
	Message,
}) => {
	return (
		<button
			onClickCapture={() => {
				if (!IsLoading) {
					OnClick();
				}
			}}
			className={`${
				!IsSecondary
					? 'bg-primary hover:bg-primary-hover text-white'
					: 'border-2 border-solid border-primary text-primary'
			} font-semibold rounded-lg h-10 mx-auto cursor-pointer transition-all duration-300 ${AdditionalButtonStyle} ${
				IsLoading ? `w-1/3 ${AdditionalLoadingStyle}` : ''
			}`}>
			{(!IsLoading ? (
				Message
			) : (
				<ImSpinner8 className='text-center mx-auto animate-spin' />
			)) || 'Button'}
		</button>
	);
};

export default LoadingButton;
