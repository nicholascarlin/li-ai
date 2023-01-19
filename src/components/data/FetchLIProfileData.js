import fetch from 'unfetch';

const FetchLIProfileData = async (linkedinurl) => {
	const url = `/api/liProf`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},
		body: JSON.stringify({ linkedinurl }),
	});

	if (res.ok) {
		let responseData = await res.json();
		//console.log(responseData)
		return responseData.data;
	} else {
		return 'Uh oh. Somethings gone wrong.';
	}
};

export default FetchLIProfileData;
