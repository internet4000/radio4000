import Ember from 'ember';
import clean from 'radio4000/utils/clean';

export default Ember.Controller.extend({
	didCacheSlug: false,
	titleMaxLength: 32,
	titleMinLength: 4,
	channelDescriptionMaxLength: 280,

	cacheSlug: Ember.computed('model.slug', function() {
		this.cachedSlug = this.get('model.slug');
		this.toggleProperty('didCacheSlug');
	}),

	updateImage: Ember.observer('newImage', function() {
		var newImage = this.get('newImage');

		this.createImage(newImage);

		// // if we have no previous image
		// if (!coverImage) {
		// 	Ember.debug('Creating channel image.');
		//
		// 	this.createImage();
		//
		// // else if we have an image
		// } else {
		// 	Ember.debug('Updating channel image.');
		//
		// 	// and it's not the same one
		// 	if (newImage === coverImage.get('src')) {
		// 		Ember.debug('Stopped updating because it is the same src property');
		// 		return;
		// 	}
		//
		// 	// update it
		// 	coverImage.set('src', newImage);
		// 	channel.save().then(function() {
		// 		Ember.debug('Updated channel image.');
		// 	});
		// }
	}),

	createImage(src) {
		var channel = this.get('model');
		var image = this.store.createRecord('image', {
			src: src,
			channel: channel
		});

		// save and add it to the channel
		image.save().then((image) => {
			Ember.debug('Image saved.');

			channel.get('images').addObject(image);
			channel.save().then(() => {
				Ember.debug('Saved channel with image');
			});
		});
	},

	// Makes sure the slug is valid e.g. not in use by any other channel
	validateSlug() {
		Ember.debug('Validating slug.');
		var slugIsFree = false;
		var model = this.get('model');
		var slug = model.get('slug');

		// Make sure the new one isn't empty
		if (Ember.isEmpty(slug)) {
			alert('Hey, the URL can not be empty. Please enter the URL you would like your channel to have. If you have no clue, just enter the title.');
			return false;
		}

		// Clean it
		var newSlug = clean(this.get('model.slug'));

		// get all channels
		var channels = this.store.find('channel');
		channels.then(function(channels) {

			console.log('');
			console.log('all channel slugs:');
			channels.forEach(function(channel) {
				console.log(channel.get('slug'));
			});

			console.log('');
			console.log('testing: ' + newSlug);

			// and find duplicates
			// var duplicates = channels.filter(function(item) {
			// 	console.log(item.get('slug'));
			// 	console.log(newSlug);
			// 	return item.get('slug') === newSlug;
			// });

			var duplicates = channels.filterBy('slug', newSlug);

			// console.log('');
			// console.log('all ('+ duplicates.get('length') +') duplicates:');
			// duplicates.forEach(function(item) {
			// 	console.log(item.get('slug'));
			// });

			// filter out own model
			// var filtered = duplicates.filter(function(item) {
			// 	Ember.debug(item);
			// 	Ember.debug(model);
			// 	return item !== model;
			// });

			// console.log('filtered duplicates:');
			// filtered.forEach(function(duplicate) {
			// 	console.log(duplicate.get('slug'));
			// });

			// if there is only one duplicate (the same channel) it's free!
			if (duplicates.get('length') < 2) {
				slugIsFree = true;
			}

			// 3. Set slug accordingly
			if (slugIsFree) {
				Ember.debug('Setting slug to: ' + newSlug);
				this.send('save');
			} else {
				alert('Sorry, that permalink is taken. Try another one.');

				// reset the slug
				this.set('slug', '');
				this.set('isSaving', false);
			}
		}.bind(this));
	},

	actions: {
		trySave() {
			var slugDidChange = (this.get('cachedSlug') !== this.get('model.slug'));

			this.set('isSaving', true);

			// this avoid validating slugs uneccessary (because it's heavy)
			if (slugDidChange) {
				this.validateSlug();
			} else if (this.get('model.isDirty')) {
				this.send('save');
			} else {
				this.send('cancelEdit');
			}
		},

		deleteImage() {
			this.get('model.coverImage').destroyRecord().then(function() {
				Ember.debug('Deleted channel image.');
			});
		},

		// Saves the channel
		save() {
			var channel = this.get('model');
			Ember.debug('channel route save');

			channel.save().then(function() {
				this.transitionToRoute('channel', this.get('model.slug'));
				this.set('isSaving', false);
			}.bind(this));
		},

		// used by 'ESC' key in the view
		cancelEdit() {
			this.transitionToRoute('channel', this.get('model'));
			this.set('isSaving', false);
		}
	},

	// clear any unsaved changes
	deactivate() {
		this.controllerFor('channel').get('model').rollback();
	}
});
