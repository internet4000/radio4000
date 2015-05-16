import Ember from 'ember';

// in the panel-nav:partial
export default Ember.Service.extend({
	player: Ember.inject.service(),

	// onModelChange: Ember.observer('player.model', function() {
	// 	let settings = this.get('session.currentUser.settings');
	//
	// 	Ember.debug('remote control player model changed');
	//
	// 	if (!settings.get('remoteActive')) { return; }
	//
	// 	// set track on settings qnd se
	// 	settings.set('trackForRemote', model);
	// 	settings.save().then(() => {
	// 		Ember.debug('saved settings with track');
	// 	});
	// }),

	onRemoteActiveChange: Ember.observer('session.currentUser.settings.trackForRemote', function() {
		let settings = this.get('session.currentUser.settings');
		let track = this.get('session.currentUser.settings.trackForRemote');

		if (!settings.get('remoteActive')) { return; }

		// remote track changed and remoteControl is active
		// so we need to update the track here
		Ember.debug('changing track');
		this.transitionToRoute('track', track);
	})
});
