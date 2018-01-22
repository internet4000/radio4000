import { helper } from '@ember/component/helper';

// https://regex101.com/r/pJ4wC5/1
const hashtagRegex = /(^|\s)(#[a-z\d-]+)/ig

export function linkHashtags([string, slug]) {
	if (!slug) {
		return string
	}

	let href = `/${slug}/tracks?search=$2`
	let link = string.replace(hashtagRegex, `$1<a href="${href}">$2</a>`)

	// link = encodeURIComponent(link)

	// Ember doesn't understand # in the URL. Replacing "#" with "%23" works.
	link = link.replace(/(=#)/gi, '=%23')

	return link
}

export default helper(linkHashtags)

