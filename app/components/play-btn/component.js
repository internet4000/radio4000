import Ember from 'ember';

const {Component, inject, debug, computed} = Ember;

// Pass it a track to play it.
// Pass it a channel to play latest track.
// Set isShuffled to true it will play random and enable isShuffled on the player.
// It will load all tracks async (use isLoading in templates)

export default Component.extend({
	player: inject.service(),
	bot: inject.service(),
	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['isLoading', 'isInPlayer', 'nothingToPlay:is-hidden'],
	isInPlayer: computed.reads('channel.isInPlayer'),
	isShuffled: computed.reads('isInPlayer'),

	// if it is in the player
	// that mean clicking again should play a random track
	click() {
		const player = this.get('player');
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

		// Loads necessary all tracks and then returns another promise
		// for the last track.
		const promise = this.get('bot').findLastTrack(channel);

		promise.then(track => {
			this.set('isLoading', false);

			// If we have no track, the radio is empty,
			// so we set a class in order to hide the button.
			const nothingToPlay = Boolean(!track);
			this.set('nothingToPlay', nothingToPlay);

			if (track) {
				this.get('player').playTrack(track);
			}
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
