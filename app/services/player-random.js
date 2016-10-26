import Ember from 'ember';
import randomHelpers from 'radio4000/mixins/random-helpers';

const {Service, inject, debug, RSVP} = Ember;

export default Service.extend(randomHelpers, {
	player: inject.service(),

	// Pool of shuffled tracks: those availabled to be picked form
	randomPool: [],

	// Shuffles a 'channel.tracks' array and sets it as the random pool.
	setNewRandomPool(items) {
		debug('setNewRandomPool');
		const shuffledItems = [];
		items.forEach(item => {
			shuffledItems.pushObject(item);
		});
		this.set('randomPool', this.shuffle(shuffledItems));
	},

	// Returns @promise {track} model that has to be played, to the player@nextRandom promise so it waits there is a track found to play it
	getNext() {
		const array = this.get('randomPool');
		const currentIndex = array.indexOf(this.get('player.model'));

		return new RSVP.Promise(resolve => {
			const item = array.objectAt(currentIndex + 1);
			if (!item) {
				resolve(array.objectAt(0));
			}
			resolve(item);
		});
	},

	// Returns a promise with the track previously played with player.isRandom = true
	getPrevious() {
		const array = this.get('randomPool');
		const currentIndex = array.indexOf(this.get('player.model'));

		return new RSVP.Promise(resolve => {
			const item = array.objectAt(currentIndex - 1);
			if (!item) {
				resolve(array.objectAt(array.length - 1));
			}
			resolve(item);
		});
	}
});
