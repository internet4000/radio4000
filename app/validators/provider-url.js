import BaseValidator from 'ember-cp-validations/validators/base'
import { mediaUrlParser } from 'media-url-parser'

const ProviderUrl = BaseValidator.extend({
	validate(value) {
		let parsed;
		try {
			parsed = mediaUrlParser(value)
		} catch(e) {
			return 'Use a valid URL, starting with `https://`'
		}

		const knownProviders = {
			youtube: true,
			soundcloud: true
		}
		const p = Object.keys(knownProviders)
					.map((provider) => provider.capitalize())
					.join(', ')

		if (parsed.url && parsed.id && parsed.provider) {
			const canParse = knownProviders[parsed.provider] === true
			return canParse || `Use a URL from a valid provider: ${p}`
		}
		return `Use a valid media URL from: ${p}`
	}
});

export default ProviderUrl;
