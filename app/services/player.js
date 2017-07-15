import Ember from 'ember';

const {Service, inject, get, set, debug, computed} = Ember;

export default Service.extend({
	store: inject.service(),
	currentTrack: null,
	currentChannel: computed.alias('currentTrack.channel'),
	isPlaying: computed.bool('currentTrack'),

	// play a track model
	playTrack(model) {
		if (!model) {
			debug('playTrack() was called without a track.');
			return;
		}
		set(this, 'currentTrack', model);
	},

	onTrackChanged(event) {
		console.log('event', event);

		// set previous track as non active
		// set new track as played and active
		console.log('event.previousTrack', event.previousTrack)
		if(Object.keys(event.previousTrack).length) {
			get(this, 'store').findRecord('track', event.previousTrack.id).then(previousTrack => {
				console.log('previousTrack', previousTrack)
				previousTrack.set('liveInCurrentPlayer', false)
			})
		}
		get(this, 'store').findRecord('track', event.track.id).then(track => {
			track.setProperties({
				'playedInCurrentPlayer': true,
				'liveInCurrentPlayer': true
			});
		});
	},

	onTrackEnded(event) {
		console.log('event', event);
		get(this, 'store').findRecord('track', trackId).then(track => {
			track.set('finishedInCurrentPlayer', true);
		});
	}
});
