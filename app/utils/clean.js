// Dasherizes, which also makes it lowercase
// and remove special (but normally safe) chars

export default function clean(string) {
	var cleaned = string.dasherize();
	return cleaned.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
