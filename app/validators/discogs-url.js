import BaseValidator from 'ember-cp-validations/validators/base'
import {mediaUrlParser} from 'media-url-parser'

const defaultError = 'Enter a valid Discogs release or master URL'

const DiscogsUrl = BaseValidator.extend({
	validate(value) {
		// If the parser finds a Discogs id it is valid.
		try {
			let result = mediaUrlParser(value)
			if (result.id && result.provider === 'discogs') {
				return true
			}
			return defaultError
		} catch (err) {
			// Catch errors from media url parser.
			return defaultError
		}
	}
})

export default DiscogsUrl
