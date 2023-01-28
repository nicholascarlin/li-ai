import fetch from 'unfetch';

const GenerateResume = async (wExp, edExp, accpHA, person, linkedinurl) => {
	const url = `/api/AI`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},
		body: JSON.stringify({ wExp, edExp, accpHA, person, linkedinurl }),
	});

	if (res.ok) {
		let responseData = await res.json();

		return responseData.data;
	} else {
		return 'Uh oh. Somethings gone wrong.';
	}
};

export default GenerateResume;
