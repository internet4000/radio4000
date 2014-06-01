var PlaylistsNewController = Ember.ObjectController.extend({
	needs: ['auth'],

	init: function() {
		this.set('auth', this.get('controllers.auth'));
		this.set('playlist',  Ember.Object.create());
	},

	playlistIsValid: function() {
		var isValid = true;
		['playlist.slug', 'playlist.title', 'playlist.body'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},

	actions: {
		publishPlaylist: function() {

			if (!this.playlistIsValid()) { return; }

			// Get the current user
			Ember.RSVP.hash({
				user: this.store.find('user', this.get('auth.currentUser.id'))
			}).then(function(promises) {

				var user = promises.user;

				// Create a new playlist
				var playlist = this.store.createRecord('playlist', {
					title: this.get('playlist.title'),
					slug: this.get('playlist.slug'),
					image: this.get('playlist.image'),
					body: this.get('playlist.body'),
					created: new Date().getTime(),
					user: promises.user
				});

				// Mark that the user has at least one playlist
				user.set('hasPlaylist', true);

				// Save the playlist
				playlist.save().then(function() {

					// and then save the same playlist into the user
					Ember.RSVP.Promise.cast(user.get('playlists')).then(function(playlists) {
						playlists.addObject(playlist);
						user.save().then(function() {
							// success?
						}, function() {
							// error?
						});
					});
				});

				// // Empty the form fields
				// this.setProperties({
				// 	'playlist.title': '',
				// 	'playlist.body': '',
				// 	'playlist.image': '',
				// 	'playlist.slug': ''
				// });

				this.transitionToRoute('playlist', playlist);

			}.bind(this));
		}
	},

	playlist: undefined
});

export default PlaylistsNewController;
