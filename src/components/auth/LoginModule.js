import { createRef, useState } from 'react';

import AuthWrapper from './AuthWrapper';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';
import { styleProps } from './AuthStyle';
import { useAuth } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationProvider';

export const LoginModule = () => {
	const [isLoading, setLoadingStatus] = useState(false);
	const emailRef = createRef();
	const passwordRef = createRef();

	let notify = useNotification();

	const { signIn } = useAuth();

	const navigate = useNavigate();

	async function handleSubmit() {
		setLoadingStatus(true);
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		signIn({ email, password }).then((resp) => [HandleLogin(resp)]);
	}

	const HandleLogin = (resp) => {
		if (resp.error) {
			notify({
				type: 'ERROR',
				header: 'Login Error',
				body: resp?.error?.message,
			});
		} else {
			console.log('RESP TOKEN', resp?.data?.session?.access_token);
			localStorage.setItem('auth', resp?.data?.session?.access_token);
			navigate('/home');
		}
		setLoadingStatus(false);
	};

	return (
		<AuthWrapper>
			<div className={styleProps.wrapperStyle}>
				<div className={styleProps.logoStyle}>APPLICANT AI</div>
				<div className={styleProps.additionalWrapperStyle}>
					<div className={styleProps.headerStyle}>Login</div>
					<div className={styleProps.subheaderStyle}>
						Please sign in to your account
					</div>
				</div>
				<TextInput
					AdditionalWrapperStyle={styleProps.additionalWrapperStyle}
					Placeholder={'Email'}
					ref={emailRef}
					Type='text'
				/>
				<TextInput
					AdditionalWrapperStyle={styleProps.additionalWrapperStyle}
					Placeholder={'Password'}
					ref={passwordRef}
					Type='password'
				/>
				<div
					onClick={() => {
						navigate('/forgot-password');
					}}
					className={styleProps.fpStyle}>
					Forgot your password?
				</div>

				<LoadingButton
					AdditionalButtonStyle={styleProps.additionalWrapperStyle}
					Message={'Login'}
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

export default LoginModule;
