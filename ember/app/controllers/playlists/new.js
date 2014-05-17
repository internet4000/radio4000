var PlaylistsNewController = Ember.ObjectController.extend({
	needs: ['auth'],

	init: function() {
		this.set('auth', this.get('controllers.auth'));
		this.set('playlist',  Ember.Object.create());
	},

	playlistIsValid: function() {
		var isValid = true;
		['playlist.url', 'playlist.title', 'playlist.body'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},

	actions: {
		publishPlaylist: function() {

			if (!this.playlistIsValid()) { return; }

			Ember.debug(this.get('auth'));

			// Define the new playlist
			var newPlaylist = this.store.createRecord('playlist', {
				title: this.get('playlist.title'),
				body: this.get('playlist.body'),
				created: new Date().getTime()
				// ,user: 'test'//this.get('auth').get('currentUser.id')
			});

			// Save it to the DB
			newPlaylist.save();

			// Empty the form fields
			this.setProperties({
				'playlist.title': '',
				'playlist.body': ''
			});

			this.transitionToRoute('playlist', newPlaylist);

			// Ember.RSVP.hash({
			// 	user: this.get('util').getUserByUsername(this.get('playlist.username'))
			// }).then(function(promises) {
			// }.bind(this));
		}
	},

	playlist: undefined
});

export default PlaylistsNewController;
