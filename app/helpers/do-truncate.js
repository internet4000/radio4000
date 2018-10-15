/**
 * Truncate text helper

	Use in a .hbs file like this:

	{{do-truncate "abcdefghijklmnopqrstuvwxyz" 10}}

	or like this

	{{do-truncate someVariable 140}}
*/

import Ember from 'ember'

export default Ember.Helper.helper(([text, maxLength = 200]) => {
	if (!text) {
		return ''
	}

	let truncated = text.length > maxLength ?
		text.substr(0, maxLength - 1) + '…' : text

	return Ember.String.htmlSafe(truncated)
})
