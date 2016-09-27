import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import channelConst from 'radio4000/utils/channel-const';
import EmberValidations from 'ember-validations';

const {debug, get, Controller, computed, observer} = Ember;

export default Controller.extend(EmberValidations, {
	didCacheSlug: false,

	// form validations and resulting errors
	showErrors: false,
	validations: {
		'model.title': {
			length: {
				minimum: channelConst.titleMinLength,
				maximum: channelConst.titleMaxLength
			}
		},
		'model.slug': {
			length: {
				minimum: channelConst.titleMinLength,
				maximum: channelConst.titleMaxLength
			}
		},
		'model.body': {
			length: {
				maximum: channelConst.descriptionMaxLength
			}
		}
		// TODO use a custom regex validation
		// 'model.url': {}
	},

	cacheSlug: computed('model.slug', function () {
		this.cachedSlug = this.get('model.slug');
		this.toggleProperty('didCacheSlug');
	}),

	updateImage: observer('newImage', function () {
		const newImage = this.get('newImage');
		this.createImage(newImage);
	}),

	createImage(src) {
		const channel = this.get('model');
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

	isSlugProtected: computed('model.slug', function () {
		const slug = get(this, 'model.slug');
		const protectedSlugs = ['add', 'about', 'job', 'jobs',
			'blog', 'bookmarklet', 'dashboard', 'help',
			'intro', 'login', '404', 'bunker', 'styleguide'];
		return protectedSlugs.any(s => s === slug);
	}),

	isSlugFree: computed('model.slug', function () {
		const slug = get(this, 'model.slug');
		const cleanedSlug = clean(slug);
		return new Ember.RSVP.Promise((resolve, reject) => {
			// Check if the slug is in our "protected routes"
			if (this.get('isSlugProtected')) {
				reject(new Error(`Sorry, the URL "${slug}" is already taken.\n\nPlease try another one.`));
			}
			// Check the database and see if the slug is free
			this.store.query('channel', {
				orderBy: 'slug',
				equalsTo: cleanedSlug
			}).then(channels => {
				// This filter should not be neccesary because query should do it.
				const duplicates = channels.filterBy('slug', cleanedSlug);
				// Since slug is already set on the channel there can be 1 duplicate
				if (duplicates.length <= 1) {
					resolve(cleanedSlug);
				} else {
					reject(new Error(`Sorry, the URL "${cleanedSlug}" is already taken.\n\nPlease try another one.`));
				}
			});
		});
	}),

	// Makes sure the slug is valid e.g. not in use by any other channel
	// not protected and not empty
	validateSlug() {
		const slug = this.get('model.slug');
		debug('Validating slug.');
		return new Ember.RSVP.Promise((resolve, reject) => {
			this.get('isSlugFree').then(slug => {
				resolve(slug);
			}, error => {
				reject(error);
			});
		});
	},

	// clear any unsaved changes
	deactivate() {
		this.controllerFor('channel').get('model').rollbackAttributes();
	},

	actions: {
		trySave() {
			const flashMessages = get(this, 'flashMessages');
			this.validate().then(() => {
				debug('form validates!!!');

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
				this.set('showErrors', true);
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
				debug('Saved --> channel');
				this.transitionToRoute('channel', this.get('model.slug'));
				flashMessages.info('Changes saved');
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
		}
	}
});
