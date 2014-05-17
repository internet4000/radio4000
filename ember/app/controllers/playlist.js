var PlaylistController = Ember.ObjectController.extend({
	needs: ['auth'],
	actions: {
		publishTrack: function(playlist, track) {
			Ember.debug('here2');

			track.save().then(function() {
				Ember.RSVP.Promise.cast(playlist.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					playlist.save().then(function() {
						// success?
					}, function() {
						// error?
					});
				});
			});
		}
	}
});

export default PlaylistController;
