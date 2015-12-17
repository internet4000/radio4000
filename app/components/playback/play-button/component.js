import Ember from 'ember';

const {Component, inject, debug, computed} = Ember;

// Pass it a track to play it.
// Pass it a channel to play latest track.
// Set isShuffle to true it will play random and enable isShuffle on the player.
// It will load all tracks async (use isLoading in templates)

export default Component.extend({
	player: inject.service(),
	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['isLoading', 'isInPlayer'],
	isInPlayer: computed.reads('channel.isInPlayer'),
	isShuffle: computed.reads('isInPlayer'),

	// if it is in the player
	// that mean clicking again should play a random track
	click() {
		let player = this.get('player');
		if (this.get('isInPlayer')) {
			debug('isInPlayer -> nextRandom');
			return player.activateRandom().then(() => {
				player.next();
			});
		}
		return this.playChannel();
	},

	/**
		@method playChannel
		@returns none
		manages the loading state of the track to be played
		and makes it play in this order:
	*/
	playChannel(channel = this.get('channel')) {
		debug('play channel');
		this.set('isLoading', true);
		let track = this.loadTracks(channel).then(tracks => {
			this.set('isLoading', false);
			return tracks.get('lastObject');
		});
		track.then(item => {
			this.set('isLoading', false);
			this.get('player').playTrack(item);
		});
	},
	/**
		@method loadTracks
		@returns promise {tracks}
		so we can display a loading state
		and show the player only when the track is ready to be played
	*/
	loadTracks(channel) {
		this.set('isLoading', true);
		return channel.get('tracks');
	}
});
