import Ember from 'ember';

export default Ember.Route.extend({
	player: Ember.inject.service(),
	uiStates: Ember.inject.service(),

	// Track is nested inside channel.index and doesn't have a template,
	// which means it won't render anything. Instead, we pass the channel
	// and track to the playback service, which in turn delegates the track
	// to our playback component
	setupController(controller, model) {
		this.set('player.model', model);
		// this.syncTrack(model);
	},

	// make sure fullscreen video is off when you leave the track
	deactivate() {
		this.get('uiStates').set('isFullscreen', false);
	}

	// syncTrack(model) {
	// 	let isAuthenticated = this.get('session.isAuthenticated');
	// 	let settings = this.get('session.currentUser.settings');
	//
	// 	// if not authed or no settings, play normally
	// 	if (!isAuthenticated || !settings) {
	// 		this.set('player.model', model);
	// 		return;
	// 	}
	//
	// 	settings.then((settings) => {
	// 		const remote = settings.get('isRemoteActive');
	//
	// 		// if remote isn't activated, play normally
	// 		if (!remote) {
	// 			debug('got settings but remote is off, playing normally');
	// 			this.set('player.model', model);
	// 			return;
	// 		}
	//
	// 		// TODO: this shouldn't play the track because it
	// 		debug('got setting and remote, syncing remote track');
	// 		debug(model.get('title'));
	//
	// 		settings.set('trackForRemote', model);
	// 		settings.save();
	// 	});
	// }
});
