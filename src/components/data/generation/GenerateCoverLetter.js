import fetch from 'unfetch';

const GenerateCoverLetter = async (
	title_applying_for,
	linkedinurl,
	company_url
) => {
	const url = `/api/coverLetter`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},
		body: JSON.stringify({ title_applying_for, linkedinurl, company_url }),
	});

	if (res.ok) {
		let responseData = await res.json();

		return responseData.data;
	} else {
		return null;
	}
};

export default GenerateCoverLetter;
