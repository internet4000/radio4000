import Ember from 'ember';

const { computed, observer, debug } = Ember;

export default Ember.Controller.extend({
	player: Ember.inject.service(),
	remoteControl: Ember.inject.service(),
	isMinimalUi: false,
	isMinimalUiAnimation: false,
	isFullscreen: false,
	isPanelOpen: false,
	isOnSignIn: false,

	trackForRemote: computed.alias('session.currentUser.settings.trackForRemote'),

	remoteTrackHasChanged: observer('trackForRemote', function() {
		let remoteTrack = this.get('trackForRemote');

		debug('application:controller remoteTrackHasChanged updated player:model');
		this.set('player.model', remoteTrack);
	}),

	actions: {
		togglePanel() {
			this.toggleProperty('isPanelOpen');
		},
		toggleFullscreen() {
			this.toggleProperty('isFullscreen');
		},
		ytPlaying() {
			this.set('player.isPlaying', true);
		},
		ytPaused() {
			this.set('player.isPlaying', false);
		},
		ytEnded() {
			this.set('player.isPlaying', false);
			this.get('player').next();
		},
		ytError(error) {
			this.set('player.isPlaying', false);
			debug(error);

			// dont do anything on 'invalid parameter'
			if (error === 2) { return; }

			// otherwise play next
			this.get('player').next();
		}
	}
});
