import BaseValidator from 'ember-cp-validations/validators/base';
import { mediaUrlParser } from 'media-url-parser';

const DiscogsUrl = BaseValidator.extend({
	validate(value) {
		let result = mediaUrlParser(value);
		if (!result.id) {
			return 'Please enter a full and valid Discogs URL';
		}
		return true;
	}
});

export default DiscogsUrl;
