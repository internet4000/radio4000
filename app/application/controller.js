import Ember from 'ember';

export default Ember.Controller.extend({
	player: Ember.inject.service(),
	isMinimalUi: false,
	isFullscreen: false,
	isPanelOpen: false,
	isOnSignIn: false,

	actions: {
		togglePanel() {
			this.toggleProperty('isPanelOpen');
		},

		toggleFullscreen() {
			this.toggleProperty('isFullscreen');
		},

		activateRemote() {
			Ember.debug('remote activated');
		},

		ytPlaying() {
			// Ember.debug('on playing from controller');
			this.set('player.isPlaying', true);
		},
		ytPaused() {
			this.set('player.isPlaying', false);
			// Ember.debug('on paused from controller');
		},
		ytEnded() {
			this.set('player.isPlaying', false);
			// Ember.debug('on ended from controller');
			this.get('player').next();
		},
		ytError(error) {
			this.set('player.isPlaying', false);
			// Ember.debug('on yt error from controller');
			Ember.debug(error);

			// dont do anything on 'invalid parameter'
			if (error === 2) { return; }

			// otherwise play next
			this.get('player').next();
		}
	}
});
