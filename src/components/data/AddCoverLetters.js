import fetch from 'unfetch';

const AddCoverLetters = async (newNum) => {
	console.log('AddCoverLettersCALLED', newNum);
	const url = `api/user/coverLetters/addNum`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},
		body: JSON.stringify(newNum),
	});

	if (res.ok) {
		let responseData = await res.json();
		console.log(responseData);
		return responseData.userCreds;
	} else {
		return null;
	}
};

export default AddCoverLetters;
