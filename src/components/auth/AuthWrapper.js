import background from '../../assets/images/test.jpg';
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
		} else {
			localStorage.clear()
			navigate('/');
		}
	}, [user]);

	return (
		<div className='w-full h-full flex'>
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
