import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		newPlaylist: function() {
			if (!this.playlistIsValid()) { return false; }
			this.createPlaylist();
		}
	},

	// Make sure the form fields aren't empty
	playlistIsValid: function() {
		var isValid = true;
		['title', 'body'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		Ember.debug(isValid);
		return isValid;
	},

	// Create a new playlist
	createPlaylist: function() {
		var user = this.get('auth.user');

		var newPlaylist = this.get('store').createRecord('playlist', {
			created: new Date().getTime(),
			title: this.get('title'),
			body: this.get('body'),
			user: user
			// slug: this.get('slug'),
			// image: this.get('image'),
		}).save();

		// Indicate that we have at least one playlist
		user.set('hasPlaylist', true);
		user.save();

		this.transitionToRoute('playlists');
	}
});
