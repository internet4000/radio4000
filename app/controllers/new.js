import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		newPlaylist: function() {
			if (this.validPlaylist) {
				this.createNewPlaylist();
			}
		}
	},

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

	// Create a new playlist
	createNewPlaylist: function() {
		Ember.debug('createNewPlaylist');

		var self= this;
		var user = this.get('session.user');
		if (!user) { Ember.warn('no user'); return false; }

		Ember.debug(user);

		var newPlaylist = this.store.createRecord('playlist', {
			title: this.get('title'),
			slug: this.get('title').dasherize(),
			body: this.get('body'),
			created: new Date().getTime(),
			uid: user.id,
			user: user
		}).save().then(function(savedPlaylist) {

			// Redirect to the new playlist
			self.transitionToRoute('playlist', savedPlaylist);

			// Save the new playlist on the user
			user.get('playlists').then(function(userPlaylists) {
				userPlaylists.addObject(savedPlaylist);
				user.save().then(function() {
					Ember.debug('playlist saved on user');

				});
			});
		});
	}
});
