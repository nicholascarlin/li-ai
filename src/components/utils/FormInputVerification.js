export const VerifyEmail = (email) => {
	var validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (email.match(validRegex)) {
		return true;
	} else {
		return 'Please enter a valid email address';
	}
};
