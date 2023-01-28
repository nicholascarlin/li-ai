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
