import Ember from 'ember';

export default Ember.ObjectController.extend({
	title: '', // define the title used for the input

	// Makes sure the form fields aren't empty
	validPlaylist: function() {
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

			// make sure playlist is valid and that we have a user
			if (!this.validPlaylist) { return false; }
			if (!user) { Ember.warn('no user'); return false; }

			// create a new playlist
			var newPlaylist = this.store.createRecord('playlist', {
				title: this.get('title'),
				slug: this.get('title').dasherize(),
				body: this.get('body'),
				created: new Date().getTime(),
				uid: user.id,
				user: user
			}).save().then(function(savedPlaylist) {

				// Redirect to the new playlist
				self.transitionToRoute('playlist.add', savedPlaylist);

				// Save the new playlist on the user
				user.get('playlists').then(function(userPlaylists) {
					userPlaylists.addObject(savedPlaylist);
					user.save().then(function() {
						Ember.debug('playlist saved on user');
					});
				});
			});
		}
	}
});
