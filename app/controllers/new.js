import Ember from 'ember';

export default Ember.ObjectController.extend({
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
			var model = this.get('model');
			var user = this.get('session.user');
			var self = this;

			model.setProperties({
				title: this.get('title'),
				slug: this.get('slug'),
				body: this.get('body'),
				created: new Date().getTime(),
				uid: user.id,
				user: user
			});

			model.save().then(function() {
				Ember.debug('channel saved');
			});

			// Save the new channel on the user
			user.get('channels').then(function(channls) {
				channls.addObject(model);
				user.save().then(function() {
					Ember.debug('channel added to user');
				});
			});


			// Redirect to the new channel
			this.transitionToRoute('channel.add', model);
		}
	}
});
