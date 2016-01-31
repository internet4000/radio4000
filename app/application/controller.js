import Ember from 'ember';

const {Controller, inject} = Ember;

export default Controller.extend({
	player: inject.service(),
	playerHistory: inject.service(),
	// queryParams: ['listen'],
	// listen: null,

	actions: {
		ytPlaying() {
			this.get('player').play();
		},
		ytPaused() {
			this.get('player').pause();
		},
		ytEnded() {
			this.get('player').trackEnded();
		},
		ytError(error) {
			this.get('player').onError(error);
		}
	}
});

// START REMOTE TRACK

// onTrackForRemoteChange: observer('session.currentUser.settings.trackForRemote', function () {
// 	let settings = this.get('session.currentUser.settings');
//
// 	if (!this.get('player.didPlay')) {
// 		debug('didnt activate play')
// 	}
//
// 	if (!settings) {
// 		debug('remote track changed but no settings');
// 		return;
// 	}
//
// 	settings.then(settings => {
//
// 		// make sure it doesn't run too often
// 		run.debounce(this, this.setTrackFromRemote, 400, true);
// 	});
// }),
//
// setTrackFromRemote() {
// 	let track = this.get('session.currentUser.settings.trackForRemote');
//
// 	if (!track) {
// 		debug('cant set track without a track!');
// 		return;
// 	}
//
// 	// open the track (it's a relationship)
// 	track.then(track => {
// 		debug('setting track from remote to ' + track.get('title'));
// 		this.set('player.model', track);
// 	});
// },

// END REMOTE TRACK
