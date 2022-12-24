// To use:

// const dispatch = useNotification()

// dispatch({
// 		type: "SUCCESS", "ERROR", "INFO",
// 		header: "HEADER",
// 		body: "BODY"
// })

import React, { createContext, useContext, useReducer } from 'react';

import EventNotification from '../components/UI/EventNotification';

function generateUUID() {
	var d = new Date().getTime();
	var d2 =
		(typeof performance !== 'undefined' &&
			performance.now &&
			performance.now() * 1000) ||
		0;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16;
		if (d > 0) {
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else {
			r = (d2 + r) % 16 | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
}

const NotificationContext = createContext();

const NotificationProvider = (props) => {
	// TODO: Bad ID Practice
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'ADD_NOTIFICATION':
				return [...state, { ...action.payload }];

			case 'REMOVE_NOTIFICATION':
				return state.filter((el) => el.id !== action.id);

			default:
				return state;
		}
	}, []);

	return (
		<NotificationContext.Provider value={dispatch}>
			<div className='fixed top-2 right-2 space-y-2 z-10'>
				{state?.map((note) => {
					return (
						<EventNotification
							dispatch={dispatch}
							id={note.id}
							key={note.id}
							NotificationType={note.type}
							MessageBody={note.body}
							MessageHeader={note.header}
						/>
					);
				})}
			</div>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const dispatch = useContext(NotificationContext);

	return (props) => {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: {
				id: generateUUID(),
				...props,
			},
		});
	};
};

export default NotificationProvider;
