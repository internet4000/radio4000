import Ember from 'ember';

export default Ember.Route.extend({
	// Abort if user isn't allowed to edit
	beforeModel: function() {
		var canEdit = this.controllerFor('playlist').get('canEdit');
		if (!canEdit) { this.transitionTo('playlist', this.modelFor('playlist')); }
	},
	// Create a new model we can use for the track
	model: function() {
		return Ember.Object.create();
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('isExpanded', true);
	},
	renderTemplate: function() {
		this.render({ outlet: 'playlist-body'});
	},
	deactivate: function() {
		this.controller.set('isExpanded', false);
	},
	actions: {
		//  this action is triggered from the add.js controller/template
		saveTrack: function(track) {
			var playlist = this.controllerFor('playlist').get('model');

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

			// Go back!
			this.transitionTo('playlist', playlist);
		}
	}
});
