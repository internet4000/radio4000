import Ember from 'ember';

// const {debug, observer} = Ember;

// in the panel-nav:partial
export default Ember.Service.extend({
	// player: Ember.inject.service(),

	// onModelChange: Ember.observer('player.model', function () {
	// 	let settings = this.get('session.currentUser.settings');
	//
	// 	debug('remote control player model changed');
	//
	// 	if (!settings.get('isRemoteActive')) { return; }
	//
	// 	// set track on settings qnd se
	// 	settings.set('trackForRemote', model);
	// 	settings.save().then(() => {
	// 		debug('saved settings with track');
	// 	});
	// });

	// onRemoteActiveChange: observer('session.currentUser.settings.trackForRemote', function () {
	// 	let settings = this.get('session.currentUser.settings');
	// 	let track = this.get('session.currentUser.settings.trackForRemote');
	//
	// 	if (!settings.get('isRemoteActive')) { return; }
	//
	// 	// remote track changed and remoteControl is active
	// 	// so we need to update the track here
	// 	debug('changing track');
	// 	this.transitionToRoute('track', track);
	// })
});
