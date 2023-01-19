const ActiveButton = ({
	AdditionalButtonStyle,
	Value,
	SetState,
	Message,
	IsActive,
}) => {
	return (
		<button
			onClickCapture={() => {
				SetState(Value);
			}}
			className={`border border-solid
		font-semibold rounded-lg h-12 mx-auto cursor-pointer transition-all duration-300 flex items-center justify-between px-4 ${
			IsActive
				? 'border-primary text-white bg-primary'
				: 'border-sub-medium text-sub-medium'
		} ${AdditionalButtonStyle}`}>
			<>{Message || 'Button'}</>
		</button>
	);
};

export default ActiveButton;
