var FirePlaylistComponent = Ember.Component.extend({
	classNames: ['playlist'],
	classNameBindings: ['isExpanded:playlist-expanded', 'isSingle:playlist-single'],
	trackUsername: '',
	trackBody: '',

	trackIsValid: function() {
		var isValid = true;
		['trackUsername', 'trackBody'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},

	actions: {
		publishTrack: function() {
			if (!this.trackIsValid()) { return; }
			var store = this.get('store');
			Ember.RSVP.hash({
				user: this.get('util').getUserByUsername(this.get('trackUsername'))
			}).then(function(promises) {
				// Create a new track
				var track = store.createRecord('track', {
					url: this.get('trackUrl'),
					body: this.get('trackBody'),
					published: new Date().getTime(),
					user: promises.user
				});
				// Tell the playlist about the track
				this.sendAction('onPublishTrack', this.get('playlist'), track);
				// Reset the fields
				this.setProperties({
					trackUsername: '',
					trackBody: ''
				});
			}.bind(this));
		},
		removeTrack: function(track) {
			var playlist = this.get('playlist');
			Promise.cast(playlist.get('tracks')).then(function(tracks) {
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();
			});
		}
	}
});

export default FirePlaylistComponent;
