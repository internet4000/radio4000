import Ember from 'ember';

const {Service, A, inject, computed} = Ember;

export default Service.extend({
	player: inject.service(),
	isRandom: false,

	// all listened tracks
	randomHistory: new A([]),

	// all playlist items not in the history array
	randomUnplayed: computed.filter('player.playlist.tracks', function (item) {
		return !this.get('randomHistory').contains(item);
	}),

	// gets a random track
	getRandom(array = this.get('randomUnplayed')) {
		// get random number to get random track
		let randomNumberInPlaylist = Math.floor(Math.random() * array.get('length'));
		let randomTrackInPlaylist = array.objectAt(randomNumberInPlaylist);

		// if no track, clear history and start again
		if (!randomTrackInPlaylist) {
			this.clearRandomHistory();
			randomTrackInPlaylist = this.getRandom();
		}

		// notify history
		this.get('randomHistory').pushObject(randomTrackInPlaylist);

		// return it to the nextRandom
		return array.objectAt(randomNumberInPlaylist);
	},
	clearRandomHistory() {
		let history = this.get('randomHistory');
		Ember.debug('Player history was cleared');
		history.clear();
	}
});
