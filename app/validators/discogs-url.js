import BaseValidator from 'ember-cp-validations/validators/base';
import { mediaUrlParser } from 'media-url-parser';

const DiscogsUrl = BaseValidator.extend({
	validate(value) {
		let result = mediaUrlParser(value);

		// there is no result, it is valid
		// because we allow empty discogsUrl
		if (!result) {
			return true;
		}

		// there is a result, but no id
		// that means it is not a correct url
		if (!result.id) {
			return false;
		}

		// otherwise it is correct
		return true;
	}
});

export default DiscogsUrl;
