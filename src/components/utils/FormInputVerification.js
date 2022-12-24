export const VerifyEmail = (email) => {
	var validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (email.match(validRegex)) {
		return true;
	} else {
		return 'Please enter a valid email address';
	}
};

export const VerifyLinkedInURL = (url) => {
	var validRegex =
		/(^((https?:\/\/)?((www|\w\w)\.)?)linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gim;

	if (url.match(validRegex)) {
		return true;
	} else {
		return 'Please enter a valid URL';
	}
};
