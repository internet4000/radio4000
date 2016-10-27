import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Component, inject, get, computed} = Ember;

// Pass it a track to play it.
// Pass it a channel to play latest track.
// Set isShuffled to true it will play random and enable isShuffled on the player.
// It will load all tracks async (use isLoading in templates)

export default Component.extend({
	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['isLoading', 'isInPlayer', 'nothingToPlay:is-hidden'],

	bot: inject.service(),
	player: inject.service(),

	isShuffled: computed.reads('isInPlayer'),
	isInPlayer: computed.reads('channel.isInPlayer'),

	click() {
		const player = get(this, 'player');
		const channel = get(this, 'channel');
		const alreadyPlaying = get(this, 'isInPlayer');

		if (alreadyPlaying) {
			// return player.next();
			return player.activateRandom().then(() => player.next());
		}

		get(this, 'play').perform(channel);
	},

	// Accepts a `channel` model and plays it.
	play: task(function * (channel) {
		yield get(this, 'bot.playNewestTrack').perform(channel);
	})
});
