var PlaylistsNewController = Ember.ObjectController.extend({
	init: function() {
		this.set('playlist',  Ember.Object.create());
	},
	playlistIsValid: function() {
		var isValid = true;
		['playlist.title', 'playlist.username', 'playlist.body'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},
	actions: {
		publishPlaylist: function() {
			if (!this.playlistIsValid()) { return; }
			Ember.RSVP.hash({
				user: this.get('util').getUserByUsername(this.get('playlist.username'))
			})
			.then(function(promises) {
				var newPlaylist = this.store.createRecord('playlist', {
					title: this.get('playlist.title'),
					body: this.get('playlist.body'),
					published: new Date().getTime(),
					user: promises.user
				});
				newPlaylist.save();
				this.setProperties({
					'playlist.title': '',
					'playlist.username': '',
					'playlist.body': ''
				});
				this.transitionToRoute('playlist', newPlaylist);
			}.bind(this));
		}
	},
	playlist: undefined
});

export default PlaylistsNewController;
