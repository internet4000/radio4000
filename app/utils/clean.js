export default function clean(string) {

	// Cleans spaces in the beginning or end
	// and dasherizes, which also makes it lowercase
	let cleaned = string.trim().dasherize();

	// and remove special (but normally safe) chars
	// remember not do remove hyphens ----
	return cleaned.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
