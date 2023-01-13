import React, { useState } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';

const Header = ({ isSideMenuActive }) => {
	const [isUserMenuActive, setUserMenuStatus] = useState(false);

	return (
		<div
			className={`w-full border-b-2 px-4 py-8 transition-all duration-300 ${
				isSideMenuActive ? 'pl-8' : 'pl-16'
			} flex h-16 items-center justify-between`}>
			<div>LinkedIn Scan</div>
			{/* <div
				onClick={() => {
					setUserMenuStatus(() => {
						return !isUserMenuActive;
					});
				}}
				className='flex flex-col cursor-pointer'>
				<div className='h-8 w-8 bg-danger rounded-full'></div>
				<div className='flex items-center'>
					<div>Me</div>
					<AiFillCaretDown />
				</div>
			</div>
			{isUserMenuActive ? (
				<div className='absolute right-2 top-20 bg-white border rounded-lg p-4'>
					
				</div>
			) : null} */}
		</div>
	);
};

export default Header;
