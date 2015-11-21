import Ember from 'ember';
import randomHelpers from 'radio4000/mixins/random-helpers';

const {Service, A, inject, observer, debug} = Ember;

export default Service.extend(randomHelpers, {
	player: inject.service(),
	isRandom: false,

	// all listened tracks
	randomHistory: null,
	// Pool of available = all track to be listened to
	randomPool: new A([]),

	setRandomPool() {
		let original = this.get('originalArray');
		this.set('randomPool', original.slice(0));
	},
	refreshRandomPool() {
		debug('refreshRandomPool was called');
		this.setRandomPool();
	},

	/**
		@property originalArray
		@type array
		all playlist items not in the history array
	*/
	originalArray: observer('player.playlist.tracks', function () {
		debug('originalArray = new channel to random');
		let items = this.get('player.playlist.tracks');
		this.setRandomPool();
		return items;
	}),

	/**
	 @method
	 @returns @track model that has to be played, to the player@nextRandom
	 @param {pool} array of tracks available to be played
	*/
	getRandom(pool = this.get('randomPool')) {
		debug('getRandom started');

		let poolLength = pool.get('length');

		if (!poolLength) {
			debug('pool is empty!');
			this.refreshRandomPool();
		}

		// get random number to get random track
		let randomNumberInPool = this.randomNumberInArray(poolLength);
		let randomTrackInPool = pool.objectAt(randomNumberInPool);
		console.log('randomNumberInPool:', randomNumberInPool);
		console.log('poolLength:', poolLength);
		//
		// // if no track, clear pool and start again
		// if (!randomTrackInPool) {
		// 	this.refreshRandomPool();
		// 	randomTrackInPool = this.getRandom();
		// }
		//
		// update pool & history
		// this.get('randomHistory').pushObject(randomTrackInPool);
		this.get('randomPool').removeObject(randomTrackInPool);
		//
		// // return the @track
		// return randomTrackInPool;
	}
});
