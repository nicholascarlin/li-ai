import React, { useEffect, useState } from 'react';

import AnimatedHamburgerMenu from '../UI/buttons/AnimatedHamburgerMenu';
import { FetchUser } from '../data/SupabaseFunctions';
import Header from '../UI/Header';
import LIURLBody from '../bodies/LIURLBody';
import LoadingPage from './LoadingPage';
import ResumeBody from '../bodies/ResumeBody';
import SideBar from '../UI/SideBar';
import { useAuth } from '../../contexts/Auth';

const HomePage = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isSideMenuActive, setSideMenuStatus] = useState(false);
	const [isLoaded, setLoadingStatus] = useState(false);
	const [isLIURLSet, setLIURLStatus] = useState(false);

	let { user: userAuth } = useAuth();

	useEffect(() => {
		setLoadingStatus(true);
		HandleLoad();
	}, []);

	const HandleLoad = async () => {
		let tempUser = await FetchUser(userAuth.user.id);
		setCurrentUser(tempUser);

		console.log('USER', tempUser);

		if (tempUser.li_url !== '') {
			setLIURLStatus(true);
		}

		setLoadingStatus(true);
	};

	return isLoaded ? (
		<div className='flex fixed w-full'>
			<AnimatedHamburgerMenu
				isOpen={isSideMenuActive}
				SetStatus={setSideMenuStatus}
			/>
			<SideBar isSideMenuActive={isSideMenuActive} />
			<div className='flex flex-col w-full'>
				<Header isSideMenuActive={isSideMenuActive} />
				{!isLIURLSet ? <LIURLBody /> : <ResumeBody />}
			</div>
		</div>
	) : (
		<LoadingPage />
	);
};

export default HomePage;
