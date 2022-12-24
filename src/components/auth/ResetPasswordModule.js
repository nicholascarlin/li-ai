import React, { useEffect, useRef, useState } from 'react';

import AuthWrapper from './AuthWrapper';
import BackButton from '../UI/buttons/BackButton';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';
import { styleProps } from './AuthStyle';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationProvider';

const ResetPasswordModule = () => {
	let passwordRef = useRef();
	let confirmationPasswordRef = useRef();

	const { resetPassword } = useAuth();

	const [isLoading, setLoadingStatus] = useState(null);

	const navigate = useNavigate();

	const notify = useNotification();

	const handleSubmit = async () => {
		setLoadingStatus(true);
		if (passwordRef.current.value !== confirmationPasswordRef.current.value) {
			notify({
				type: 'ERROR',
				header: 'Signup Error',
				body: 'Passwords must match',
			});
		} else {
			try {
				let password = passwordRef.current.value;
				resetPassword({ password }).then((resp) => {
					if (resp.error) {
						notify({
							type: 'ERROR',
							header: 'Reset Password Error',
							body: resp?.error?.message,
						});
					} else {
						notify({
							type: 'SUCCESS',
							header: 'Password Changed',
							body: 'Password has successfully changed.',
						});
						navigate('/login');
					}
				});
			} catch (error) {
				console.log(error);
				notify({
					type: 'ERROR',
					header: 'Reset Password Error',
					body: 'Error communicating with server. Please request another link and try again',
				});
				navigate('/forgot-password');
				setLoadingStatus(false);
				return;
			}
		}
		setLoadingStatus(false);
	};

	const HandleResetError = () => {
		navigate('/forgot-password');
		setLoadingStatus(false);
		return;
	};

	return (
		<AuthWrapper>
			<div className={styleProps.wrapperStyle + ' relative'}>
				<BackButton
					onClick={() => {
						navigate('/login');
					}}
				/>
				<div className={styleProps.additionalWrapperStyle}>
					<div className={styleProps.headerStyle}>Reset Password</div>
					<div className={styleProps.subheaderStyle}>
						Please enter and confirm your new password
					</div>
				</div>
				<TextInput
					AdditionalWrapperStyle={styleProps.additionalWrapperStyle}
					Placeholder={'New Password'}
					ref={passwordRef}
					Type='password'
				/>
				<TextInput
					AdditionalWrapperStyle={styleProps.additionalWrapperStyle}
					Placeholder={'Confirm New Password'}
					ref={confirmationPasswordRef}
					Type='password'
				/>
				<LoadingButton
					AdditionalButtonStyle={styleProps.additionalWrapperStyle}
					Message={'Submit'}
					OnClick={handleSubmit}
					IsLoading={isLoading}
				/>
				<div className={styleProps.subtextStyle}>
					Don't have an account?{' '}
					<span
						onClick={() => {
							navigate('/signup');
						}}
						className={styleProps.fpStyle}>
						Sign Up Here
					</span>
				</div>

				<div className={styleProps.footerStyle}>Carlton-Gernét Ltd.</div>
			</div>
		</AuthWrapper>
	);
};

export default ResetPasswordModule;
