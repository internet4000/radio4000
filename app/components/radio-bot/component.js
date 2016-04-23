import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Component, debug, inject} = Ember;

export default Component.extend({
	bot: inject.service(),
	player: inject.service(),

	classNames: ['Bot'],
	channel: null,

	skipRadio: task(function * (prev) {
		const channel = yield this.get('bot').findRandomChannel();
		if (prev && prev.id === channel.id) {
			return this.get('skipRadio').perform(channel);
		}
		this.set('channel', channel);
		this.get('playTrack').perform(channel);
	}).drop(),

	playTrack: task(function * (channel) {
		const track = yield this.get('bot').findLastTrack(channel);
		if (track) {
			this.get('player').playTrack(track);
			// player.activateRandom().then(player.next);
		} else {
			debug('no track!');
		}
	}).drop()
});

