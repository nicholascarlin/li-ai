import fetch from 'unfetch';

const FetchUserData = async (
	wExp,
	edExp,
	skills,
	whoUR,
	accpHA,
	linkedinurl
) => {
	const url = `/api/AI`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},
		body: JSON.stringify({ wExp, edExp, skills, whoUR, accpHA, linkedinurl }),
	});

	if (res.ok) {
		let responseData = await res.json();

		return responseData.data;
	} else {
		return 'Uh oh. Somethings gone wrong.';
	}
};

export default FetchUserData;
