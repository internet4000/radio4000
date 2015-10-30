import Ember from 'ember';
import EmberValidations, {validator} from 'ember-validations';
import youtubeRegex from 'npm:youtube-regex';

const {Component} = Ember;

export default Component.extend(EmberValidations, {
	tagName: 'form',
	classNames: ['Form'],
	classNameBindings: ['box:Form--box'],

	showErrors: false,
	validations: {
		'track.url': {
			// format: {
			// 	with: youtubeRegex()
			// }
			inline: validator(function () {
				let isValid = Boolean(youtubeRegex().exec(this.get('track.url')));
				if (!isValid) {
					return 'Please enter a valid YouTube URL';
				}
			})
		},
		'track.title': {
			presence: true,
			length: {maximum: 256}
		},
		'track.body': {
			length: {maximum: 300}
		}
	},

	getYoutubeId(urlstring) {
		let matches = youtubeRegex().exec(urlstring);
		if (!matches) {
			return false;
		}
		return matches[1];
	},

	actions: {
		submit() {
			this.validate().then(() => {
				// all validations pass
				this.sendAction('submit', this.get('track'));
			}).catch(() => {
				// any validations fail
				this.set('showErrors', true);
			});
		},
		cancel() {
			this.sendAction('cancel');
		}
	}
});
