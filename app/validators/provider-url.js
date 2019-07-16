import BaseValidator from 'ember-cp-validations/validators/base'
import { mediaUrlParser } from 'media-url-parser'

const ProviderUrl = BaseValidator.extend({
	validate(value) {
		const parsed = mediaUrlParser(value)
		const knownProviders = {
			youtube: true,
			soundcloud: true
		}

		if (parsed.url && parsed.id && parsed.provider) {
			const canParse = knownProviders[parsed.provider] === true
			return canParse
		}
		return 'Provide a valid Youtube or Soundcloud media URL'
	}
});

export default ProviderUrl;
