import Ember from 'ember';

export default Ember.Route.extend({

	// don't use the outlet of playlist.hbs, but an outlet in application.hbs
	renderTemplate: function() {
		this.render('track', {
			into: 'application',
			outlet: 'player'
		});
	},
	setupController: function(controller, model) {
		this.controllerFor('playback').set('model', model);
	},

	deactivate: function() {
		// make sure fullscreen video is off
		this.controllerFor('playback').set('isMaximized', false);
	}
});
