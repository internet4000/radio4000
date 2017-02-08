import Ember from 'ember';
import clean from 'radio4000/utils/clean';

const {debug, get, set, Controller, computed, observer} = Ember;

export default Controller.extend({
	isSaving: false, // replace with ember-concurrency
	disableSubmit: computed.or('isSaving', 'model.validations.isInvalid'),

	didCacheSlug: false,

	backgroundColorStyle: computed('model.backgroundColor', function () {
		return new Ember.Handlebars.SafeString(`background-color: ${this.get('model.backgroundColor')}`);
	}),
	cacheSlug: computed('model.slug', function () {
		this.cachedSlug = get(this, 'model.slug');
		this.toggleProperty('didCacheSlug');
	}),

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

		return new Ember.RSVP.Promise((resolve, reject) => {
			// Check if the slug is in our "protected routes"
			const blacklist = ['add', 'about', 'job', 'jobs', 'blog', 'bookmarklet', 'dashboard', 'help', 'intro', 'login', '404', 'bunker', 'styleguide'];
			if (blacklist.any(s => s === slug)) {
				reject(new Error(errorMessage));
			}
			// Check the database to see if the slug is free. The filter below should not be neccesary.
			// And since slug is already set on the channel, there can be a single duplicate.
			this.store.query('channel', {
				orderBy: 'slug',
				equalsTo: slug
			}).then(channels => {
				const duplicates = channels.filterBy('slug', slug);
				if (duplicates.length <= 1) {
					resolve(slug);
				} else {
					reject(new Error(errorMessage));
				}
			});
		});
	},

	// Makes sure the slug is valid e.g. not in use by any other channel not protected and not empty
	validateSlug() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			this.isSlugFree().then(slug => {
				resolve(slug);
			}, error => {
				reject(error);
			});
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

			model.validate().then(() => {
				const slugDidChange = (this.get('cachedSlug') !== this.get('model.slug'));
				this.set('isSaving', true);
				if (slugDidChange) {
					this.validateSlug().then(cleanedSlug => {
						this.set('model.slug', cleanedSlug);
						this.send('save');
					}, error => {
						Ember.debug(error);
						flashMessages.warning(error);
						// reset the slug
						this.set('slug', '');
						this.set('isSaving', false);
					});
				} else if (this.get('model.hasDirtyAttributes')) {
					this.send('save');
				} else {
					this.send('cancelEdit');
				}
			}).catch(() => {
				// show errors on forms, why does it not validate
				debug('form not validating…');
			});
		},

		deleteImage() {
			this.get('model.coverImage').destroyRecord().then(() => {
				debug('Deleted channel image.');
			});
		},

		// Saves the channel
		save() {
			const channel = this.get('model');
			const flashMessages = Ember.get(this, 'flashMessages');
			debug('channel route save');

			channel.save().then(() => {
				flashMessages.info('Saved');
				// We have to transition if the slug changed. Otherwise reloading is a 404.
				this.transitionToRoute('channel', this.get('model.slug'));
			}).catch(() => {
				// This get triggered for exemple when firebase.security do not validate
				flashMessages.warning(`Sorry, we couldn't save your radio. Please refresh your browser to try again.`);
			}).finally(() => {
				// anyways, reset UI
				this.set('isSaving', false);
			});
		},

		// used by 'ESC' key in the view
		cancelEdit() {
			debug('Cancel edit --> channel');
			this.transitionToRoute('channel', this.get('model'));
			this.set('isSaving', false);
		},

		colorChanged(color) {
			set(this, 'model.backgroundColor', color);
			get(this, 'model').save();
		},

		removeBackgroundColor() {
			set(this, 'model.backgroundColor', null);
			get(this, 'model').save();
		}
	}
});
