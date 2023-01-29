/**
 *
 * @param {string} NotificationType ERROR, SUCCESS, INFO
 * @param {string} MessageHeader Bolded Notification Text
 * @param {string} MessageBody Notification Subtext
 */

import {
	AiOutlineCheckCircle,
	AiOutlineClose,
	AiOutlineCloseCircle,
	AiOutlineExclamationCircle,
} from 'react-icons/ai';
import { useEffect, useState } from 'react';

const EventNotification = ({
	NotificationType,
	MessageHeader,
	MessageBody,
	dispatch,
	id,
}) => {
	const [timeOutprogress, setTimeoutProgress] = useState(0);
	const [intervalId, setIntervalId] = useState(null);
	const [exit, setExitStatus] = useState(true);

	const HandleStartTimer = () => {
		const id = setInterval(() => {
			setTimeoutProgress((prev) => {
				if (prev < 100) {
					return prev + 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, 20);
		setIntervalId(id);
	};

	const HandlePauseTimer = () => {
		console.log('CALLED');
		clearInterval(intervalId);
	};

	const HandleCloseNotification = () => {
		HandlePauseTimer();
		setExitStatus(true);
		setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTIFICATION',
				id: id,
			});
		}, 400);
	};

	useEffect(() => {
		if (timeOutprogress === 100) {
			HandleCloseNotification();
		}
	}, [timeOutprogress]);

	useEffect(() => {
		HandleStartTimer();
		setExitStatus(false);
	}, []);

	return (
		<div
			onMouseEnter={HandlePauseTimer}
			onMouseLeave={HandleStartTimer}
			className={`flex flex-col w-[calc(25vw)] bg-white shadow-lg transition-all duration-300 relative rounded-md ${
				!exit ? 'ml-0' : 'ml-[calc(120%)]'
			}`}>
			<div className='flex w-full'>
				<div className='p-3 border-r-2 border-r-sub-medium'>
					{NotificationType === 'ERROR' ? (
						<AiOutlineCloseCircle className='text-4xl text-danger' />
					) : null}
					{NotificationType === 'SUCCESS' ? (
						<AiOutlineCheckCircle className='text-4xl text-success' />
					) : null}
					{NotificationType === 'INFO' ? (
						<AiOutlineExclamationCircle className='text-4xl text-information' />
					) : null}
				</div>
				<div className='relative grow pl-3 my-auto'>
					<div className='text-sm font-bold'>{MessageHeader || 'Head'}</div>
					<div className='text-xs fond-light'>
						{MessageBody || 'This is the body'}
					</div>
				</div>
				<AiOutlineClose
					onClick={() => HandleCloseNotification()}
					className='absolute top-2 right-2 cursor-pointer'
				/>
			</div>
			<div
				style={{
					width: `${timeOutprogress}%`,
				}}
				className={`h-1 rounded-bl-md ${
					NotificationType === 'ERROR'
						? 'bg-danger'
						: NotificationType === 'SUCCESS'
						? 'bg-success'
						: 'bg-information'
				}`}></div>
		</div>
	);
};

export default EventNotification;
