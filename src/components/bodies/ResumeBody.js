import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai';
import React, { useState } from 'react';

const ResumeBody = () => {
	const [activeExperienceArray, setActiveExperienceArray] = useState([]);

	const ExperienceArray = [
		{
			expName: 'Emerging Leaders Intern - Operations Associate',
			expCompany: 'Paylocity',
			expType: 'Internship',
			expStartDate: 'May 2022',
			expEndDate: 'Aug 2022',
			expDuration: '4 mos',
			expLocation: 'Schaumburg, Illinois, United States',
			expDescription:
				'The Emerging Leaders Internship is focused on the accelerated development of individuals through immersion within a front-line customer-facing role, numerous process improvement projects, and exposure to operations management strategy.\n-Created new severity evaluation process for client product development requests allowing for more efficient resource allocation, better client service, and improved long-term efficiency.\n-Developed Python tool to evaluate existing backlog of ~10,000 product development requests. Automated tool identified 2,615 obsolete requests for closure and saves ~850 employee hours in ongoing manual evaluation.\n-Created knowledge hub to share processes, how-tos, and information across business functions raising product development request knowledge by 40%, with 60% of survey respondents rating usefulness in top categories.',
		},
		{
			expName: 'Software Development Intern',
			expCompany: 'Freeus, LLC',
			expType: 'Full-Time',
			expStartDate: 'Jun 2021',
			expEndDate: 'Aug 2021',
			expDuration: '3 mos',
			expLocation: 'Ogden, Utah, United States',
			expDescription:
				'-Overhauled core distress systems allowing for logging of all signals while maintaining emergency response times using abstraction, reflection, and genericism. This process identified and fixed a massive vulnerability resulting in multiple emergency calls being dropped.\n-Restructured call center interaction protocols allowing for a distinct codebase from sister company AvantGuard. Restructuring facilitated the acquisition of two other call centers.\n-Coauthored unit tests for the code base expediting both error detection and bug fixes.\n-Built portal allowing the provider network to manage devices at the end-user level.',
		},
	];

	return (
		<div className='w-full h-full flex flex-col items-center'>
			<div className='flex flex-col items-center w-2/3 shadow-2xl p-4 rounded-lg'>
				<div className='text-left text-2xl font-bold w-full'>Experience</div>
				<div className='w-full flex flex-col p-4 space-y-6'>
					{ExperienceArray.map((item, idx) => {
						return (
							<div
								onClick={() => {
									if (activeExperienceArray.includes(idx)) {
										setActiveExperienceArray(() => {
											return activeExperienceArray.filter((e) => e !== idx);
										});
									} else {
										setActiveExperienceArray(() => {
											return [...activeExperienceArray, idx];
										});
									}
								}}
								key={idx}
								className='flex flex-col transition-all duration-300'>
								<div className='w-full flex items-center justify-between'>
									<div>
										<div className='text-lg font-medium'>{item.expName}</div>
										<div className='text-sm'>
											{item.expCompany} - {item.expType}
										</div>
									</div>
									<AiFillCaretDown
										className={`${
											activeExperienceArray.includes(idx)
												? 'rotate-0'
												: 'rotate-90'
										} transition-all duration-150`}
									/>
								</div>
								<div
									className={`${
										activeExperienceArray.includes(idx) ? 'h-full' : 'h-0'
									} transition-all duration-150 overflow-hidden`}>
									<div className='text-sm text-sub-medium'>
										{item.expStartDate} - {item.expEndDate}, {item.expDuration}
									</div>
									<div className='text-sm text-sub-medium'>
										{item.expLocation}
									</div>
									<div className='text-sm mt-3'>{item.expDescription}</div>{' '}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ResumeBody;
