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

	onTrackChanged(trackId) {
		console.log('trackId', trackId);
		get(this, 'store').findRecord('track', trackId).then(newTrack => {
			newTrack.set('playedInCurrentPlayer', true);
		});
	},

	onTrackEnded(trackId) {
		console.log('trackId', trackId);
		get(this, 'store').findRecord('track', trackId).then(newTrack => {
			newTrack.set('finishedInCurrentPlayer', true);
		});
	}
});
