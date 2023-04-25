import React, { useState } from 'react';

import { AiFillCaretLeft } from 'react-icons/ai';

const SortCoverLettersByDropDown = ({
	dropdownItemEnum,
	setCoverLetterSortOrder,
}) => {
	const [isDDActive, setDDStatus] = useState(false);
	const [activeDDItem, setActiveDDItem] = useState(dropdownItemEnum.DateDesc);

	return (
		<div class='relative inline-block text-left'>
			<button
				onClick={() => {
					setDDStatus(() => {
						return !isDDActive;
					});
				}}
				id='dropdownRadioButton'
				data-dropdown-toggle='dropdownDefaultRadio'
				class='text-white bg-primary hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700'
				type='button'>
				Sort By{' '}
				<AiFillCaretLeft
					className={`ml-2 transition-all duration-250 ${
						isDDActive ? '-rotate-90' : ''
					}`}
				/>
			</button>

			{isDDActive ? (
				<div
					id='dropdownDefaultRadio'
					class='z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 right-0 mt-1 dark:divide-gray-600 absolute'>
					<ul
						class='p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200'
						aria-labelledby='dropdownRadioButton'>
						<li>
							<div class='flex items-center'>
								<input
									checked={activeDDItem === dropdownItemEnum.DateDesc}
									onClick={() => {
										setActiveDDItem(dropdownItemEnum.DateDesc);
										setCoverLetterSortOrder(dropdownItemEnum.DateDesc);
										setDDStatus(false);
									}}
									id='default-radio-2'
									type='radio'
									value=''
									name='default-radio'
									class='focus:outline-none w-4 h-4 text-primary bg-gray-100 border-gray-300'
								/>
								<label
									for='default-radio-2'
									class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									Date Desc.
								</label>
							</div>
						</li>
						<li>
							<div class='flex items-center'>
								<input
									checked={activeDDItem === dropdownItemEnum.DateAsc}
									onClick={() => {
										setActiveDDItem(dropdownItemEnum.DateAsc);
										setCoverLetterSortOrder(dropdownItemEnum.DateAsc);
										setDDStatus(false);
									}}
									id='default-radio-3'
									type='radio'
									value=''
									name='default-radio'
									class='focus:outline-none w-4 h-4 text-primary bg-gray-100 border-gray-300'
								/>
								<label
									for='default-radio-3'
									class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									Date Asc.
								</label>
							</div>
						</li>
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default SortCoverLettersByDropDown;
