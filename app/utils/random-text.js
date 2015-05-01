// Returns a random string from a specified list of characters.

export default function randomText() {
	const chars = '0ab1cd2ef3gh4ij5kl6mn7op8q9rstuvwxyz';
	const maxLength = 4;
	let text = '';

	for (var i=0; i<maxLength; i++) {
		text += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return text;
}
