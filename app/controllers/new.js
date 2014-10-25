import Ember from 'ember';

export default Ember.ObjectController.extend({
	title: '', // define the title used for the input

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

	actions: {
		newPlaylist: function() {
			var self = this;
			var user = this.get('session.user');

			// make sure channel is valid and that we have a user
			if (!this.isValid) { return false; }
			if (!user) { Ember.warn('no user'); return false; }

			// create a new channel
			var newPlaylist = this.store.createRecord('channel', {
				title: this.get('title'),
				slug: this.get('title').dasherize(),
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
