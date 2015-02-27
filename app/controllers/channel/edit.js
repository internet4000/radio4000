import Ember from 'ember';
import clean from 'radio4000/utils/clean';

export default Ember.Controller.extend({

	// Makes sure the slug is valid e.g. not in use by any other channel
	validateSlug: function() {
		var slugIsFree = false;
		var model = this.get('model');
		var slug = model.get('slug');

		// Make sure the new one isn't empty
		if (Ember.isEmpty(slug)) {
			alert("Hey, the URL can't be empty. Please enter the URL you'd like your channel to have. If you have no clue, just enter the title.");
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
				this.set('slug', ''); // empty slug
			}
		}.bind(this));
	},

	actions: {
		// Initialize a save
		trySave: function() {
			if (!this.get('model.isDirty')) {
				this.send('cancelEdit');
			} else {
				this.validateSlug();
			}
		},

		// Saves the channel
		save: function() {
			var channel = this.get('model');
			Ember.debug('channel route save');

			channel.save().then(function() {
				this.transitionToRoute('channel', this.get('model.slug'));
			}.bind(this));
		},

		// used by 'ESC' key in the view
		cancelEdit: function() {
			this.transitionToRoute('channel', this.get('model'));
		},

		tryDelete: function() {
			var confirmed = confirm('Are you sure? Your channel will be gone forever - you will lose all your tracks');
			if (confirmed) {
				this.send('deleteChannel');
			}
		},

		// Deletes the channel 4 real
		deleteChannel: function() {
			var _this = this;
			var channel = this.get('model');
			var user = this.get('session.user');
			var users = this.store.find('user');
			var promises = [];

			// destroy the channel
			channel.destroyRecord().then(function() {
				// and remove it from the user
				user.get('channels').removeObject(channel);
				user.save();
			});

			// remove it as favorite on all users
			users.then(function(users) {
				users.forEach(function(user) {
					user.get('favoriteChannels').then(function(favs) {
						favs.removeObject(channel);
						if (favs.get('isDirty')) {
							Ember.debug('is dirty');
							promises.push(favs.save());
						}
					});
				});
			}, function() {
				//developer failed to save;
				Ember.warn('Error');
			});

			// All favorites have been removed
			Ember.RSVP.all(promises).then(function() {
				_this.transitionToRoute('/');
			}, function() {
				Ember.warn('Error');
				//one or more languages failed to save
			});
		}
	}
});
