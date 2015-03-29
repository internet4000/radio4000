// Returns a random string from a specified list of characters.

export default function randomText() {
	var text = '';
	var length = 4;
	var chars = '0ab1cd2ef3gh4ij5kl6mn7op8q9rstuvwxyz';

	for (var i=0; i<length; i++) {
		text += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return text;
}
