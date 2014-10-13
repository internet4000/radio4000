import Ember from 'ember';

export default Ember.Route.extend({

	model: function() {
		return Ember.Object.create();
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('isExpanded', true);
	},

	deactivate: function() {
		this.controller.set('isExpanded', false);
	},

	// render into the playlist template
	renderTemplate: function() {
		this.render({ outlet: 'playlist-body'});
	},

	actions: {
		saveTrack: function(track) {

			var playlist = this.controllerFor('playlist').get('model');

			// Save the track
			track.save().then(function() {
				// And add it to the tracks property of the playlist
				Ember.RSVP.Promise.cast(playlist.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					playlist.save().then(function() {
						Ember.debug('Success: Track saved to playlist');
					}, function() {
						Ember.debug('Error: Track NOT saved to playlist');
					});
				});
			});
		}
	}
});
