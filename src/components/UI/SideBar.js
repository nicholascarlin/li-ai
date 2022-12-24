import React, { useState } from 'react';

import { useAuth } from '../../contexts/Auth';

const SideBar = ({ isSideMenuActive }) => {
	const [activeSideMenuItem, setActiveSideMenuItem] = useState(0);

	const { signOut } = useAuth();

	const sideBarItems = [
		{
			title: 'Dashboard',
			route: '/welcome',
			count: 5,
		},
		{
			title: 'Products',
			route: '/welcome',
			count: 8,
		},
		{
			title: 'Performance',
			route: '/welcome',
			count: 0,
		},
		{
			title: 'Deliverables',
			route: '/welcome',
			count: 0,
		},
		{
			title: 'Invoices',
			route: '/welcome',
			count: 25,
		},
		{
			title: 'Inventory',
			route: '/welcome',
			count: 0,
		},
		{
			title: 'Settings',
			route: '/welcome',
			count: 0,
		},
		{
			title: 'Sign Out',
			clickFunction: async () => {
				await signOut();
			},
		},
	];

	return (
		<div
			className={`h-screen transition-all duration-300 overflow-hidden ${
				isSideMenuActive ? 'w-[calc(300px)] border-r border-sub-medium' : 'w-0'
			}`}>
			<div className='mt-4 text-2xl text-center'>LOGO</div>
			<div className='w-full mt-4 grow flex flex-col p-6 space-y-10'>
				{sideBarItems.map((item, idx) => {
					return (
						<div
							key={idx}
							onClick={() => {
								if (item.clickFunction) {
									item.clickFunction();
								}
								setActiveSideMenuItem(idx);
							}}
							className='flex justify-between items-center cursor-pointer'>
							<div
								className={`font-medium font-  ${
									idx === activeSideMenuItem ? 'text-primary' : ''
								}`}>
								{item.title}
							</div>
							{item.count > 0 ? (
								<div className='bg-primary text-white rounded-lg px-4 py-1'>
									{item.count}
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SideBar;
