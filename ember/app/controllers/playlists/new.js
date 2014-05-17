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

			Ember.RSVP.hash({
				user: this.store.find('user', this.get('auth.currentUser.id'))
			}).then(function(promises) {
				// Ember.debug(promises);
				// console.log(promises);

				// Create a new playlist
				var newPlaylist = this.store.createRecord('playlist', {
					title: this.get('playlist.title'),
					body: this.get('playlist.body'),
					created: new Date().getTime(),
					user: promises.user
				});

				// Save it to the DB and try to relate the playlist to the current user. Currently it stores the user id in the playlist but it would be nicer if the playlist id was stored in the user object
				newPlaylist.save().then(function() {
					Ember.RSVP.Promise.cast(promises.user.get('playlists')).then(function(users) {
						users.addObject(newPlaylist);
						newPlaylist.save().then(function() {
							// success?
						}, function() {
							// error?
						});
					});
				});

				// Empty the form fields
				this.setProperties({
					'playlist.title': '',
					'playlist.body': ''
				});

				this.transitionToRoute('playlist', newPlaylist);

			}.bind(this));
		}
	},

	playlist: undefined
});

export default PlaylistsNewController;
