import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		create: function() {
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
		var user = this.get('auth.user');

		// be sure the user does not already has a playlist (prevent multiple click on create)
		console.log();

		if(typeof user.playlist === 'undefined'){

			var newPlaylist = this.get('store').createRecord('playlist', {
				created: new Date().getTime(),
				title: this.get('title'),
				slug: this.get('slug'),
				body: this.get('body'),
				user: user
			}).save();

			// Save the relationship on the user as well
			user.save();

			// Go to the new route
			this.transitionToRoute('playlist', newPlaylist);

		};
	}
});
