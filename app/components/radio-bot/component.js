import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Component, inject} = Ember;

export default Component.extend({
	classNames: ['Bot'],
	channel: null,

	bot: inject.service(),
	player: inject.service(),

	skipRadio: task(function * (prev) {
		const channel = yield this.get('bot').findRandomChannel();
		// if the new "random" is the same (it happens), run again
		if (prev && prev.id === channel.id) {
			return this.get('skipRadio').perform(channel);
		}
		this.set('channel', channel);
		this.get('playTrack').perform(channel);
		this.get('player').set('isShuffled', true);
	}).drop(),

	playTrack: task(function * (channel) {
		const track = yield this.get('bot').findLastTrack(channel);
		if (!track) {
			throw new Error('playTrack was called without a track.');
		}
		this.get('player').playTrack(track);
	}).drop()
});

