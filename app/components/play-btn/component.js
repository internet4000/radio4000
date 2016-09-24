import Ember from 'ember';

const {Component, inject, get, set, computed} = Ember;

// Pass it a track to play it.
// Pass it a channel to play latest track.
// Set isShuffled to true it will play random and enable isShuffled on the player.
// It will load all tracks async (use isLoading in templates)

export default Component.extend({
	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['isLoading', 'isInPlayer', 'nothingToPlay:is-hidden'],

	player: inject.service(),
	bot: inject.service(),

	isShuffled: computed.reads('isInPlayer'),
	isInPlayer: computed.reads('channel.isInPlayer'),

	// If the channel is already loaded in the player,
	// we activate shuffle/random and skip to next track.
	// Otherwise play the radio.
	click() {
		const player = get(this, 'player');
		const alreadyPlaying = get(this, 'isInPlayer');
		if (alreadyPlaying) {
			return player.activateRandom().then(() => player.next());
		}
		return this.playChannel();
	},

	// Accepts a `channel` model and plays it.
	playChannel(channel = get(this, 'channel')) {
		const player = get(this, 'player');
		const promise = get(this, 'bot').findLastTrack(channel);

		set(this, 'isLoading', true);
		promise.then(track => {
			set(this, 'isLoading', false);
			if (track) {
				player.playTrack(track);
			} else {
				// Without a track we can't play the radio,
				// so we set a class in order to hide the button.
				const noTrack = Boolean(!track);
				set(this, 'nothingToPlay', noTrack);
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
		set(this, 'isLoading', true);
		return channel.get('tracks');
	}
});
