import Ember from 'ember';

export default Ember.ObjectController.extend({
	title: '', // define the title used for the input
	slug: '', // define the title used for the input

	// Makes sure the form fields aren't empty
	isValid: function() {
		var isValid = true;
		['title'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		Ember.debug(isValid);
		return isValid;
	},

	makeid: function() {
		var text = "";
		var possible = "0ab1cd2ef3gh4ij5kl6mn7op8q9rstuvwxyz";
		for (var i=0; i < 4; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	},

	validateSlug: function() {
		var self = this;
		var canIHazSlug = true;
		// dasherize turns spaces into dashes and makes it lowercase
		var slug = this.get('slug');

		this.store.find('channel').then(function(channels) {
			channels.forEach(function(channel) {
				// If any other channel has the same slug, abort!
				if (channel.get('slug') === slug) {
					canIHazSlug = false;
				}
			});

			if (!canIHazSlug) {
				Ember.debug('Slug is in use');
				this.set('slug', slug + '-' + self.makeid()); // revert to old slug
			}

			this.send('savePlaylist');
		}.bind(this));
	},

	actions: {
		newPlaylist: function() {
			var self = this;
			var user = this.get('session.user');

			// validation
			if (!this.isValid) { return false; }
			if (!user) { Ember.warn('no user'); return false; }

			// set initial slug from title and test it
			this.set('slug', this.get('title').dasherize());
			this.validateSlug();
		},
		savePlaylist: function() {
			var user = this.get('session.user');
			var self = this;
			var newPlaylist = this.store.createRecord('channel', {
				title: this.get('title'),
				slug: this.get('slug'),
				body: this.get('body'),
				created: new Date().getTime(),
				uid: user.id,
				user: user
			}).save().then(function(savedPlaylist) {

				// Redirect to the new channel
				self.transitionToRoute('channel.add', savedPlaylist);

				// Save the new channel on the user
				user.get('channels').then(function(userPlaylists) {
					userPlaylists.addObject(savedPlaylist);
					user.save().then(function() {
						Ember.debug('channel saved on user');
					});
				});
			});
		}
	}
});
