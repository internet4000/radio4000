import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import randomText from 'radio4000/utils/random-text';
import EmberValidations from 'ember-validations';

const {debug, computed} = Ember;

export default Ember.Controller.extend(EmberValidations, {
	title: '',
	isSaving: false,

	// form validation
	validations: {
		title: {
			length: {
				minimum: 4,
				maximum: 32
			}
		}
	},
	// errors from form validation
	showErrors: false,

	// cleans the slug from bad things and suffix it with a random string
	cleanSlug: computed('title', function () {
		let title = clean(this.get('title'));
		let random = randomText();

		return `${title}-${random}`;
	}),

	actions: {
		// Create a channel record and sends order to save it on parent route
		create() {
			// first we do a form validation on channel.title
			this.validate().then(() => {
				debug('Form validates!');
				this.set('isSaving', true);

				let slug = this.get('cleanSlug');
				let title = this.get('title');
				debug(`title: ${title}`);

				title = title.trim();
				debug(`title.trim(): ${title}`);

				// create channel record
				const channel = this.store.createRecord('channel', {
					title: title,
					slug: slug
				});
				// save it on the parent route
				this.send('saveChannel', channel);
			}).catch(() => {
				this.set('showErrors', true);
				debug('Form does not validate');
				console.log(this.get('errors'));
			});
		}
	}
});
