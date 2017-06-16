import Ember from 'ember';

const { Service, set, debug, computed } = Ember;

export default Service.extend({
	currentTrack: null,
	currentChannel: computed.alias('currentTrack.channel'),
	isPlaying: computed.bool('currentTrack'),

	// play a track model
	playTrack(model) {
		if (!model) {
			debug('playTrack() was called without a track.');
			return;
		}
		set(this, 'currentTrack', model)
	}
});
