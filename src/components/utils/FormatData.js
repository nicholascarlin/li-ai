export const FormatDate = (year, month) => {
	console.log('CALLED', year, month);
	let monthAbbreviations = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	return `${monthAbbreviations[month - 1]} ${year}`;
};

export const FormatTimestamp = (timestamp) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	let hours = date.getHours();
	const minutes = date.getMinutes();

	const ampm = hours < 12 ? 'AM' : 'PM';
	hours = hours % 12 || 12;

	const formattedDate = `${month}/${day}/${year}`;
	const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}${ampm}`;

	return `${formattedDate}, ${formattedTime}`;
};
