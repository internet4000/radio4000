import Ember from 'ember';

export default Ember.Route.extend({

	// 1. this is an empty function to stop ember from
	// trying to render a track template
	renderTemplate: function() {},

	// 2. because we just pass the track and channel to the playback controller instead
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
