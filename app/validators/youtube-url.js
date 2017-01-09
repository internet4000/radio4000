import BaseValidator from 'ember-cp-validations/validators/base';
import youtubeRegex from 'npm:youtube-regex';

const YoutubeUrl = BaseValidator.extend({
	validate(value) {
		const valid = youtubeRegex().test(value);
		if (!valid) {
			return 'Please enter a full YouTube URL';
		}
		return true;
	}
});

export default YoutubeUrl;
