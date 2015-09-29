import Ember from 'ember';
import clean from 'radio4000/utils/clean';
import channelConst from 'radio4000/utils/channel-const';

const { debug, computed, observer } = Ember;

export default Ember.Controller.extend({
	didCacheSlug: false,
	titleMaxLength: channelConst.titleMaxLength,
	titleMinLength: channelConst.titleMinLength,

	cacheSlug: computed('model.slug', function() {
		this.cachedSlug = this.get('model.slug');
		this.toggleProperty('didCacheSlug');
	}),

	updateImage: observer('newImage', function() {
		const newImage = this.get('newImage');
		this.createImage(newImage);
	}),

	createImage(src) {
		const channel = this.get('model');
		const image = this.store.createRecord('image', {
			src: src,
			channel: channel
		});

		// save and add it to the channel
		image.save().then((image) => {
			debug('Image saved.');

			channel.get('images').addObject(image);
			channel.save().then(() => {
				debug('Saved channel with image');
			});
		});
	},

	slugisTooShort: computed('model.slug', function() {
		return this.get('model.slug.length') < this.get('titleMinLength');
	}),

	slugisTooLong: computed('model.slug', function() {
		return this.get('model.slug.length') >= this.get('titleMaxLength');
	}),

	slugisTaken: computed('model.slug', function() {
		const protectedSlugs = ['about', 'job', 'jobs',
			'blog', 'bookmarklet', 'dashboard', 'help',
			'intro', 'login', '404', 'bunker', 'styleguide'];

		return protectedSlugs.any((slug) => slug === this.get('model.slug'));
	}),

	slugIsFree: computed('model.slug', function() {
		let cleanedSlug = clean(this.get('model.slug'));

		return new Ember.RSVP.Promise((resolve, reject) => {

			this.store.findAll('channel').then((channels) => {
				// If there is 1 (same channel) or 0 duplicates we're good
				let duplicates = channels.filterBy('slug', cleanedSlug);
				if (duplicates.get('length') < 2) {
					resolve(cleanedSlug);
				} else {
					reject(new Error(`Sorry, that url is taken. Try another one.`));
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
			// Make sure the new slug isn't empty or already taken
			if (Ember.isEmpty(slug)) {
				reject(new Error(`Sorry, the URL can not be empty. Please enter a URL you'd like for your radio. If you have no clue, enter the title.`));
			} else if (this.get('slugisTooLong')) {
				reject(new Error(`Too long. Keep it below ${this.titleMaxLength}, please.`));
			} else if (this.get('slugisTooShort')) {
				reject(new Error(`Too short. Keep it above ${this.titleMinLength}, please.`));
			} else if (this.get('slugIsTaken')) {
				reject(new Error(`Sorry, ${slug} is already taken.\n\nPlease try another url.`));
			}

			this.get('slugIsFree').then((slug) => {
				resolve(slug);
			}, (error) => {
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
			let slugDidChange = (this.get('cachedSlug') !== this.get('model.slug'));
			this.set('isSaving', true);

			if (slugDidChange) {
				this.validateSlug().then((cleanedSlug) => {
					this.set('model.slug', cleanedSlug);
					this.send('save');
				}, (error) => {
					Ember.debug(error);
					alert(error);
					// reset the slug
					this.set('slug', '');
					this.set('isSaving', false);
				});
			} else if (this.get('model.hasDirtyAttributes')) {
				this.send('save');
			} else {
				this.send('cancelEdit');
			}
		},

		deleteImage() {
			this.get('model.coverImage').destroyRecord().then(function() {
				debug('Deleted channel image.');
			});
		},

		// Saves the channel
		save() {
			const channel = this.get('model');
			debug('channel route save');

			channel.save().then(() => {
				debug('Saved --> channel');
				this.transitionToRoute('channel', this.get('model.slug'));
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
