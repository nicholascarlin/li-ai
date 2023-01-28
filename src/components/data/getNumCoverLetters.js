import fetch from 'unfetch';

const getNumCoverLetters = async (linkedinurl) => {
	const url = `/api/user/coverletters/getNum`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},

	});

	if (res.ok) {
		let responseData = await res.json();
		console.log(responseData)
		return responseData.userCreds;
	} else {
		return null;
	}
};

export default getNumCoverLetters;
