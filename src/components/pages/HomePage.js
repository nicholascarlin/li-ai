import React, { useEffect, useState } from 'react';

import AnimatedHamburgerMenu from '../UI/buttons/AnimatedHamburgerMenu';
import { FetchUser } from '../data/SupabaseFunctions';
import Header from '../UI/Header';
import SideBar from '../UI/SideBar';
import { useAuth } from '../../contexts/Auth';

const HomePage = () => {
	const [user, setUser] = useState(null);
	const [isSideMenuActive, setSideMenuStatus] = useState(false);

	let { user: userAuth } = useAuth();

	useEffect(() => {
		setUser(() => {
			return FetchUser(userAuth.user.id);
		});
		console.log('UA', user);
	}, []);

	return (
		<div className='flex fixed w-full'>
			<AnimatedHamburgerMenu
				isOpen={isSideMenuActive}
				SetStatus={setSideMenuStatus}
			/>
			<SideBar isSideMenuActive={isSideMenuActive} />
			<div className='flex flex-col w-full'>
				<Header isSideMenuActive={isSideMenuActive} />
				<div>BODy</div>
			</div>
		</div>
	);
};

export default HomePage;
