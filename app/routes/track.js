import Ember from 'ember';

export default Ember.Route.extend({

	// Track is nested inside channel.index
	// but it doesn't have a template,
	// which means it won't render anything.

	// Instead, we pass the channel and track to the playback controller
	setupController(controller, model) {
		const channel = this.modelFor('channel');

		this.controllerFor('playback').setProperties({
			model: model,
			channel: channel
		});

		// update the remote controller
		// which is currently on the channel model
		// channel.setProperties({
		// 	listeningToTrack: model,
		// 	listeningToChannel: channel
		// });
		// channel.save();
	},

	// make sure fullscreen video is off when you leave the track
	deactivate() {
		this.controllerFor('playback').set('isMaximized', false);
	}
});
