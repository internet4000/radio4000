// Cleans spaces in the beginning or end
// and dasherizes, which also makes it lowercase
// and remove special (but normally safe) chars
// remember not do remove hyphens ----
export default function clean(string) {
	let cleaned = string.trim().dasherize();
	return cleaned.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
