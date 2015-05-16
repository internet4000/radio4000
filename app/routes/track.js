import Ember from 'ember';

export default Ember.Route.extend({
	player: Ember.inject.service(),

	// Track is nested inside channel.index
	// but it doesn't have a template,
	// which means it won't render anything.

	// Instead, we pass the channel and track to the playback controller
	setupController(controller, model) {

		Ember.debug('setting player model');
		this.get('player').setProperties({
			model
		});

		// update the remote controller
		// which is currently on the channel model
		// const channel = this.modelFor('channel');
		// channel.setProperties({
		// 	listeningToTrack: model,
		// 	listeningToChannel: channel
		// });
		// channel.save();
	},

	// make sure fullscreen video is off when you leave the track
	deactivate() {
		this.controllerFor('application').set('isFullscreen', false);
	}
});
