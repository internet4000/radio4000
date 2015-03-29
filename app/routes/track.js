import Ember from 'ember';

export default Ember.Route.extend({

	// Track is nested inside channel.index
	// but it doesn't have a template,
	// which means it won't render anything.

	// Instead, we pass the channel and track to the playback controller
	setupController (controller, model) {
		var channel = this.modelFor('channel');

		// controller.set('content', model);
		this.controllerFor('playback').set('model', model);
		this.controllerFor('playback').set('channel', channel);
	},

	// make sure fullscreen video is off when you leave the track
	deactivate() {
		this.controllerFor('playback').set('isMaximized', false);
	}
});
