import Ember from 'ember'
import {helper} from '@ember/component/helper'
import {htmlSafe} from '@ember/string'

// https://regex101.com/r/pJ4wC5/1
const hashtagRegex = /(^|\s)(#[a-z\d-]+)/ig

export function linkHashtags([string, slug]) {
	if (!slug) {
		return string
	}

	let stringWithLinks = string
		.replace(hashtagRegex, `$1<a href="/${slug}/tracks?search=$2">$2</a>`)

	// Ember doesn't understand # in the URL. Replacing "#" with "%23" works.
	// link = encodeURIComponent(link)
	stringWithLinks = stringWithLinks.replace(/(=#)/gi, '=%23')

	// Make sure result is html safe.
	Ember.Handlebars.Utils.escapeExpression(stringWithLinks)

	// And "mark" it as safe.
	return htmlSafe(stringWithLinks)
}

export default helper(linkHashtags)
