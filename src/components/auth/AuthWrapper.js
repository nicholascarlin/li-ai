import background from '../../assets/images/background.jpg';
import { useAuth } from '../../contexts/Auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = (props) => {
	let { user } = useAuth();

	let navigate = useNavigate();

	useEffect(() => {
		if (user) {
			console.log('USER', user);
			navigate('/');
		}
	}, [user]);

	return (
		<div className='w-full h-full flex items-center justify-center text-white'>
			<img
				className='w-full h-full object-cover absolute z-0'
				src={background}
				alt='Background'
			/>
			{props.children}
		</div>
	);
};

export default AuthWrapper;
