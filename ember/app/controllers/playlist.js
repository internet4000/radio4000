var PlaylistController = Ember.ObjectController.extend({
	needs: ['auth'],

	init: function () {
		this.authController = this.get('controllers.auth');
		// Ember.debug('authCtrl: ' + authCtrl);
		// this._super();
	},

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
