import { BiArrowBack } from 'react-icons/bi';
import React from 'react';

const BackButton = ({ additionalStyling, onClick }) => {
	return (
		<BiArrowBack
			onClick={onClick}
			className={`top-3 left-3 text-sub-medium text-2xl absolute cursor-pointer ${additionalStyling}`}
		/>
	);
};

export default BackButton;
