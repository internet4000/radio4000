import Ember from 'ember';

const { computed, observer, debug } = Ember;

export default Ember.Controller.extend({
	player: Ember.inject.service(),
	remoteControl: Ember.inject.service(),
	isMinimalUi: false,
	isFullscreen: false,
	isPanelOpen: false,
	isOnSignIn: false,

	trackForRemote: computed.alias('session.currentUser.settings.trackForRemote'),

	onTrackForRemoteChange: observer('trackForRemote', function() {
		let settings = this.get('session.currentUser.settings');
		let track = this.get('trackForRemote');

		// debug(track);

		if (!settings || !track) {
			debug('remote track changed but no settings or track');
			return;
		}

		// Ember.run.throttle(this, this.setTrack, 1000);
		Ember.run.once(this, this.setTrack);
	}),

	setTrack() {
		let settings = this.get('session.currentUser.settings');
		let track = this.get('trackForRemote');

		// check settings
		// settings.then(() => {
		// 	let remote = settings.get('isRemoteActive');
		// 	console.log('remote is ' + remote);
		// });

		// open the track (it's a relationship)
		track.then((track) => {

			// it can also be null after opening
			if (!track) {
				debug('no track to set from remote');
				return;
			}

			// make sure it doesn't run too often
			debug('setting track from remote');
			this.set('player.model', track);
		});
	},

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
