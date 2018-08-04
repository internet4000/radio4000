import BaseValidator from 'ember-cp-validations/validators/base';
import youtubeRegex from 'youtube-regex';

const YoutubeUrl = BaseValidator.extend({
	validate(value) {
		const valid = youtubeRegex().test(value);
		if (!valid) {
			return 'Please enter a full and valid YouTube URL';
		}
		return true;
	}
});

export default YoutubeUrl;
