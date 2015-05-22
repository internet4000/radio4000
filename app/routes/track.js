import Ember from 'ember';

export default Ember.Route.extend({
	player: Ember.inject.service(),
	// remoteControl: Ember.inject.service(),

	// Track is nested inside channel.index
	// but it doesn't have a template,
	// which means it won't render anything.

	// Instead, we pass the channel and track to the playback controller
	setupController(controller, model) {

		Ember.debug('track route setupController');

		if (this.get('sessionisAuthenticated')) {
			Ember.debug('authed, setting track on settings');

			// set track on user settings
			// which triggers an observer in application controller
			let settings = this.get('session.currentUser.settings');
			Ember.debug(settings);
			settings.then((settings) => {
				settings.set('trackForRemote', model);
				settings.save();
				Ember.debug('track:route settings trackForRemote - saved -');
			});
		} else {

			Ember.debug('no user, setting track directly on player');

			// set track on player
			this.get('player').setProperties({
				model
			});
		}


	},

	// make sure fullscreen video is off when you leave the track
	deactivate() {
		this.controllerFor('application').set('isFullscreen', false);
	},

	actions: {
		updateRemote() {
			Ember.debug('track:route updateRemote.action');
			return false;
		}
	}
});
