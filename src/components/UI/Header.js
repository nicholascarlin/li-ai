import ActiveButton from './buttons/ActiveButton';
import LoadingButton from './buttons/LoadingButton';
import React from 'react';
import { useAuth } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

const Header = ({ SetActiveWindow, ActiveWindow }) => {
	const { signOut } = useAuth();
	const navigate = useNavigate();

	const HandleAccountClick = () => {
		navigate('/account');
	};

	const HandleSignOutClick = () => {
		localStorage.clear();
		signOut();
	};

	let rightButtonAdditionalStyle = 'px-4';

	return (
		<div
			className={`w-full md:pt-8 md:pb-4 pt-8 flex flex-col-reverse md:flex-col md:grid md:grid-cols-3 items-center`}>
			<div className='col-start-2 align-center flex items-center justify-center mx-auto gap-4 h-full'>
				<ActiveButton
					IsActive={ActiveWindow === 'RESUME'}
					Value={'RESUME'}
					SetState={SetActiveWindow}
					Message='Generate Resume'
				/>
				<ActiveButton
					IsActive={ActiveWindow === 'COVER LETTER'}
					Value={'COVER LETTER'}
					SetState={SetActiveWindow}
					Message='Generate Cover Letter'
				/>
			</div>

			<div className='flex justify-center md:justify-end mx-auto md:ml-auto md:pr-5 gap-4 mb-10 md:mb-0'>
				<LoadingButton
					Message={'Account'}
					IsSecondary={false}
					OnClick={HandleAccountClick}
					AdditionalButtonStyle={rightButtonAdditionalStyle}
				/>
				<LoadingButton
					Message={'Sign Out'}
					IsSecondary={true}
					OnClick={HandleSignOutClick}
					AdditionalButtonStyle={rightButtonAdditionalStyle}
				/>
			</div>
		</div>
	);
};

export default Header;
