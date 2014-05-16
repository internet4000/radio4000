var PlaylistController = Ember.ObjectController.extend({
	actions: {
		publishTrack: function(playlist, track) {
			track.save().then(function() {
				Ember.RSVP.Promise.cast(playlist.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					playlist.save().then(function() {}, function() {});
				});
			});
		}
	}
});

export default PlaylistController;
