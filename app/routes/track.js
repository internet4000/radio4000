import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	player: Ember.inject.service(),

	// Track is nested inside channel.index and doesn't have a template,
	// which means it won't render anything.

	// Instead, we pass the channel and track to the playback controller
	setupController(controller, model) {
		let isAuthenticated = this.get('session.isAuthenticated');
		let settings = this.get('session.currentUser.settings');

		debug('track route setupController');

		// if not authed or no settings, play normally
		if (!isAuthenticated || !settings) {
			this.set('player.model', model);
			return;
		}

		settings.then((settings) => {
			const remote = settings.get('isRemoteActive');

			// if remote isn't activated, play normally
			if (!remote) {
				debug('got settings but remote is off, playing normally');
				this.set('player.model', model);
				return;
			}

			// TODO: this shouldn't play the track because it
			debug('got setting and remote, syncing remote track');
			settings.set('trackForRemote', model);
			settings.save();
		});
	},

	// make sure fullscreen video is off when you leave the track
	deactivate() {
		this.controllerFor('application').set('isFullscreen', false);
	}
});
