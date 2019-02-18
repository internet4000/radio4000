// Turn a string into a safe "slug". Useful for URLs.
// Cleans spaces in the beginning or end
// and dasherizes, which also makes it lowercase
// and remove special (but normally safe) chars
// remember not do remove hyphens ----.

export default function slugify(string) {
	if (!string) {
		return ''
	}
	return string
		.trim()
		.dasherize()
		.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\/]/gi, '');
}
