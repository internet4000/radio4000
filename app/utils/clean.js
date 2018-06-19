// Cleans spaces in the beginning or end
// and dasherizes, which also makes it lowercase
// and remove special (but normally safe) chars
// remember not do remove hyphens ----.
// For something with actual tests, consider https://github.com/pid/speakingurl

export default function clean(string) {
	if (!string) {
		return ''
	}
	return string
		.trim()
		.dasherize()
		.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\/]/gi, '');
}
