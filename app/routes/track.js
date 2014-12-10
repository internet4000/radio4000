import Ember from 'ember';

export default Ember.Route.extend({

	// Normally a track would render into the outlet of the channel
	// but we don't want that, so don't render anything:
	renderTemplate: function() {},

	// Instead, we want the channel and track in the playback controller
	setupController: function(controller, model) {
		var channel = this.controllerFor('channel').get('model');
		this.controllerFor('playback').set('model', model);
		this.controllerFor('playback').set('channel', channel);
	},

	// make sure fullscreen video is off when you leave the track
	deactivate: function() {
		this.controllerFor('playback').set('isMaximized', false);
	}
});
