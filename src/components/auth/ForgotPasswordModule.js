import React, { createRef, useState } from 'react';

import AuthWrapper from './AuthWrapper';
import BackButton from '../UI/buttons/BackButton';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';
import { VerifyEmail } from '../utils/FormInputVerification';
import { styleProps } from './AuthStyle';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationProvider';

const ForgotPasswordModule = () => {
	const emailRef = createRef();
	const [isLoading, setLoadingStatus] = useState(false);
	const [forgotPasswordStage, setForgotPasswordStage] = useState(0);

	const notify = useNotification();

	const navigate = useNavigate();

	const handleSubmit = async () => {
		setLoadingStatus(true);

		let isEmailValid = VerifyEmail(emailRef.current.value);
		if (isEmailValid !== true) {
			notify({
				type: 'ERROR',
				header: 'Form Error',
				body: isEmailValid,
			});
		}
		console.log('email', emailRef.current.value);

		if (forgotPasswordStage === 0) {
			const resp = await supabase.auth.resetPasswordForEmail(
				emailRef.current.value,
				{
					redirectTo: 'http://localhost:3000/reset-password',
				}
			);

			console.log('RESP', resp);

			if (!resp?.error) {
				notify({
					type: 'SUCCESS',
					header: 'Forgot Password Success',
					body: 'Please check your email for password reset link',
				});
			} else {
				notify({
					type: 'ERROR',
					header: 'Submit Error',
					body: resp?.error?.message,
				});
			}
		}

		setLoadingStatus(false);
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
					<div className={styleProps.headerStyle}>Forgot Password</div>
					<div className={styleProps.subheaderStyle}>
						Please enter email to receive reset link
					</div>
				</div>
				<TextInput
					AdditionalWrapperStyle={styleProps.additionalWrapperStyle}
					Placeholder={'Email'}
					ref={emailRef}
					Type='email'
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

export default ForgotPasswordModule;
