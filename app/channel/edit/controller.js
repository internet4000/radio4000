import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import reservedUrls from 'radio4000/utils/reserved-urls';

const {debug, get, Controller, computed, observer, RSVP, isEqual} = Ember;

export default Controller.extend({
	isSaving: false,

	disableSubmit: computed.or('isSaving', 'model.validations.isInvalid'),

	updateImage: observer('newImage', function () {
		const newImage = get(this, 'newImage');
		this.createImage(newImage);
	}),

	createImage(src) {
		const channel = get(this, 'model');
		const image = this.store.createRecord('image', {src, channel});

		// save and add it to the channel
		image.save().then(image => {
			debug('Image saved.');
			channel.get('images').addObject(image);
			channel.save().then(() => {
				debug('Saved channel with image');
			});
		});
	},

	// this could be moved to a custom slug-validator using ember-cp-validations
	isSlugFree() {
		const slug = clean(get(this, 'model.slug'));
		const errorMessage = `Sorry, the URL "${slug}" is already taken. Please try another one.`;

		if (reservedUrls.any(s => s === slug)) {
			return RSVP.Promise.reject(new Error(errorMessage));
		}

		// Check the database to see if the slug is free. The filter below should not be neccesary.
		// And since slug is already set on the channel, there can be a single duplicate.
		return this.store.query('channel', {
			orderBy: 'slug',
			equalTo: slug
		}).then(query => {
			if (query.get('firstObject')) {
				return RSVP.Promise.reject(new Error(errorMessage));
			}
			return RSVP.Promise.resolve(slug);
		});
	},

	deactivate() {
		// Clear any unsaved changes.
		this.controllerFor('channel').get('model').rollbackAttributes();
	},

	actions: {
		trySave() {
			const flashMessages = get(this, 'flashMessages');
			const model = get(this, 'model');
			const slug = get(model, 'slug');
			const initialSlug = get(this, 'initialSlug');

			if (!model.get('hasDirtyAttributes')) {
				this.send('cancelEdit');
				return;
			}

			model.validate().then(() => {
				this.set('isSaving', true);

				if (isEqual(initialSlug, slug)) {
					this.send('save');
					return;
				}

				this.isSlugFree().then(cleanedSlug => {
					this.set('model.slug', cleanedSlug);
					this.send('save');
				}).catch(err => {
					debug(err);
					flashMessages.warning(err);
					// reset the slug
					this.set('slug', initialSlug);
					this.set('isSaving', false);
				});
			}).catch(() => {
				debug('form not validating…');
			});
		},

		deleteImage() {
			return this.get('model.coverImage').destroyRecord();
		},

		// Saves the channel
		save() {
			const channel = this.get('model');
			const flashMessages = Ember.get(this, 'flashMessages');

			channel.save().then(() => {
				flashMessages.info('Saved');
				// We have to transition if the slug changed. Otherwise reloading is a 404.
				this.transitionToRoute('channel', channel.get('slug'));
			}).catch(() => {
				// This get triggered for exemple when firebase.security do not validate
				flashMessages.warning(`Sorry, we couldn't save your radio. Please refresh your browser to try again.`);
			}).finally(() => {
				this.set('isSaving', false);
			});
		},

		// used by 'ESC' key in the view
		cancelEdit() {
			this.transitionToRoute('channel', this.get('model'));
			this.set('isSaving', false);
		}
	}
});
