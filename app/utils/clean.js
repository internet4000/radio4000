export default function clean(string) {

	// Dasherizes, which also makes it lowercase
	var cleaned = string.dasherize();

	// and remove special (but normally safe) chars
	return cleaned.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
