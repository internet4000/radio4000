import Ember from 'ember';
import clean from 'radio4000/utils/clean';
// import channelConst from 'radio4000/utils/channel-const';

const { debug, computed, observer } = Ember;

export default Ember.Controller.extend({
	didCacheSlug: false,

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

	// Makes sure the slug is valid e.g. not in use by any other channel
	// not protected and not empty
	validateSlug() {
		debug('Validating slug.');
		const channels = this.store.findAll('channel');
		const model = this.get('model');
		const slug = model.get('slug');
		const protectedSlugs = ['about', 'job', 'jobs', 'blog', 'bookmarklet', 'dashboard', 'help', 'intro', 'login', '404', 'bunker', 'styleguide'];

		let slugIsFree = false;
		let newSlug = '';

		// Make sure the new slug isn't empty or already taken
		if (Ember.isEmpty(slug)) {
			alert('Hey, the URL can not be empty. Please enter the URL you would like your channel to have. If you have no clue, just enter the title.');
			this.set('slug', '');
			this.set('isSaving', false);
			return false;
		}

		if (protectedSlugs.any((s) => slug === s)) {
			alert(`Sorry, ${slug} is already taken.\n\nPlease try another url.`);
			this.set('slug', '');
			this.set('isSaving', false);
			return false;
		}

		// Clean it
		newSlug = clean(slug);

		// get all channels
		channels.then((channels) => {
			let duplicates = channels.filterBy('slug', newSlug);

			// if there is only one duplicate (the same channel) it's free!
			if (duplicates.get('length') < 2) {
				slugIsFree = true;
			}

			// 3. Set slug accordingly
			if (slugIsFree) {
				debug('Setting slug to: ' + newSlug);
				this.send('save');
			} else {
				alert('Sorry, that url is taken. Try another one.');

				// reset the slug
				this.set('slug', '');
				this.set('isSaving', false);
			}
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

			// this avoid validating slugs uneccessary (because it's heavy)
			if (slugDidChange) {
				this.validateSlug();
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
