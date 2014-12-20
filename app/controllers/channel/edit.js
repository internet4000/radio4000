import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['channel'],

	// Makes sure the slug is valid,
	// e.g. not in use by any other channel
	validateSlug: function() {
		var iCanHazSlug = true;
		var model = this.get('model');

		// make sure the new one isn't empty
		// dasherize turns spaces into dashes and makes it lowercase
		var newSlug = this.get('slug').dasherize();
		if (newSlug === '') {
			alert("Hey, the URL can't be empty. Please enter the URL you'd like your channel to have. If you have no clue, just enter the title.");
			return false;
		}

		// 1. Get all channels
		var channels = this.store.find('channel');
		channels.then(function(channels) {

			// 2. If any other channel has the same slug, set to false
			channels.forEach(function(channel) {
				if (channel !== model && channel.get('slug') === newSlug) {
					alert('Sorry, that URL is already taken. Please choose another one.');
					iCanHazSlug = false;
				}
			});

			// 3. Set slug accordingly
			if (iCanHazSlug) {
				this.set('slug', newSlug);
				Ember.debug('Setting slug to: ' + newSlug);
				this.send('save');
			} else {
				Ember.debug('Reverting slug to: ' + this.get('savedSlug'));
				this.set('slug', this.get('savedSlug')); // revert to old slug
			}
		}.bind(this));
	},

	actions: {
		trySave: function() {
			// Make sure slug is clean
			this.validateSlug();
		},
		cancelEdit: function() {
			// leaving the route also sets isexpanded to false
			this.transitionToRoute('channel', this.get('model'));
		},
		// Saves the channel
		save: function() {
			Ember.debug('channel route save');
			this.get('model').save();
			this.get('controllers.channel').send('saveImage');

			// if the model changed, make sure we match a changed slug URL
			if (this.get('isDirty')) {
				this.transitionToRoute('channel', this.get('slug'));
			}
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
			}, function(error) {
				//developer failed to save;
				Ember.debug('no…');
			});

			// All favorites have been removed
			Ember.RSVP.all(promises).then(function() {
				_this.transitionToRoute('/');
			}, function(error) {
				//one or more languages failed to save
			});
		}
	}
});
