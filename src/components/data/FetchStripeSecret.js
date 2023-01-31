const FetchStripeSecret = async (option) => {
	const url = `/api/stripe`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${localStorage.getItem('auth')}`,
		},
		body: JSON.stringify(option),
	});

	console.log('RESRES', res);

	if (res.ok) {
		let responseData = await res.json();
		return responseData.data;
	} else {
		return res.error;
	}
};

export default FetchStripeSecret;
