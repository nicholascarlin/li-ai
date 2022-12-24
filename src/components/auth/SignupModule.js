import AuthWrapper from './AuthWrapper';
import LoadingButton from '../UI/buttons/LoadingButton';
import TextInput from '../UI/inputs/TextInput';
import { styleProps } from './AuthStyle';
import { useAuth } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationProvider';

const { useRef, useState } = require('react');

const SignupModule = () => {
	const [isLoading, setLoadingStatus] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmationPasswordRef = useRef();

	const navigate = useNavigate();

	const { signUp } = useAuth();

	const notify = useNotification();

	async function handleSubmit(e) {
		setLoadingStatus(true);

		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const confirmPassword = confirmationPasswordRef.current.value;

		if (password !== confirmPassword) {
			notify({
				type: 'ERROR',
				header: 'Signup Error',
				body: 'Passwords must match',
			});
			setLoadingStatus(false);
			return;
		}

		signUp({ email, password }).then((resp) => {
			HandleSignup(resp);
		});
		setLoadingStatus(true);
		return;
	}

	const HandleSignup = (resp) => {
		if (resp.error) {
			notify({
				type: 'ERROR',
				header: 'Signup Error',
				body: resp.error.message,
			});
		}

		if (resp.data?.user) {
			navigate('/login');
			notify({
				type: 'SUCCESS',
				header: 'Signup Success',
				body: 'Please confirm your email to sign in',
			});
		}
		setLoadingStatus(false);
	};

	return (
		<AuthWrapper>
			<div className={styleProps.wrapperStyle}>
				<div className={styleProps.additionalWrapperStyle}>
					<div className={styleProps.headerStyle}>Sign Up</div>
					<div className={styleProps.subheaderStyle}>
						Get started by creating your account
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
				<TextInput
					AdditionalWrapperStyle={styleProps.additionalWrapperStyle}
					Placeholder={'Confirm Password'}
					ref={confirmationPasswordRef}
					Type='password'
				/>
				<LoadingButton
					AdditionalButtonStyle={styleProps.additionalWrapperStyle}
					Message={'Sign Up'}
					OnClick={handleSubmit}
					IsLoading={isLoading}
				/>
				<div className={styleProps.subtextStyle}>
					Already have an account?{' '}
					<span
						onClick={() => {
							navigate('/login');
						}}
						className={styleProps.fpStyle}>
						Login Here
					</span>
				</div>

				<div className={styleProps.footerStyle}>Carlton-Gernét Ltd.</div>
			</div>
		</AuthWrapper>
	);
};

export default SignupModule;
