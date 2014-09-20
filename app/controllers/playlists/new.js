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

		// 1. Get parent user, the owner
		var user = this.get('auth.user');

		// if user already has a playlist, bring him to the dashboard
		// if (user.get('playlist')) {
		// 	this.transitionToRoute('application');
		// }

		// 2. Create the playlist
		var newPlaylist = this.get('store').createRecord('playlist', {
			created: new Date().getTime(),
			title: this.get('title'),
			slug: this.get('slug'),
			body: this.get('body'),
			user: user
		});

		// 3. Save it, then
		newPlaylist.save().then(function() {
			Ember.debug('New playlist saved');
			// 4. Get the relationship on the parent
			Ember.RSVP.Promise.cast(user.get('playlists')).then(function(playlists) {
				playlists.addObject(newPlaylist);
				user.save().then(function() {
					Ember.debug('New playlist saved on the user');
				});
			});
		});

		// Go to the new route
		this.transitionToRoute('playlist', newPlaylist);
	}
});
