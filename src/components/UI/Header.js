import React from 'react';

const Header = ({ isSideMenuActive }) => {
	return (
		<div
			className={`w-full border-b-2 px-4 transition-all duration-300 ${
				isSideMenuActive ? 'pl-8' : 'pl-16'
			} flex h-16 items-center justify-between`}>
			<input className='border-2' />
			<div className='flex space-x-16 divide-x-2 h-full'>
				<div>1</div>
				<div>1</div>
				<div>1</div>
			</div>
		</div>
	);
};

export default Header;
