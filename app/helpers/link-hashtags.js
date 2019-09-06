import Ember from 'ember'
import {helper} from '@ember/component/helper'
import {htmlSafe, isHTMLSafe} from '@ember/string'
import {hashtagRegex} from '../utils/hashtag'

export function linkHashtags([string, slug]) {
	if (!slug) {
		return string
	}

	// Support use cases like {{link-hashtags (do-truncate "my-string" 20)}}
	if (isHTMLSafe(string)) {
		string = string.string
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
