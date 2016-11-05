import Ember from 'ember';
import {task} from 'ember-concurrency';
import {getRandomIndex} from 'radio4000/utils/random-helpers';

const {Service, debug, inject, set, get} = Ember;

export default Service.extend({
	store: inject.service(),
	player: inject.service(),

	playAnotherRadio: task(function * (prev) {
		let channel = yield get(this, 'findRandomChannel').perform();

		// If a `prev` channel is passed, we call the function again to avoid getting the same channel twice.
		if (prev) {
			while (channel.id === prev.id) {
				debug('found the same channel as the previous one, trying again');
				channel = yield get(this, 'findRandomChannel').perform();
			}
		}

		// Ensure shuffle is enabled.
		// The user really did not ask for this but it is for the best.
		this.get('player').set('isShuffled', true);

		yield this.get('playNewestTrack').perform(channel);
	}).drop(),

	playNewestTrack: task(function * (channel) {
		const track = yield this.get('findLastTrack').perform(channel);
		if (!track) {
			debug('playNewestTrack was called but could not find a track to play. Trying another radio.');
			this.get('playAnotherRadio').perform();
			return;
		}
		this.get('player').playTrack(track);
	}).drop(),

	playRandomTrack: task(function * (channel) {
		const track = yield this.get('findRandomTrack').perform(channel);
		this.get('player').playTrack(track);
	}).drop(),

	findLastTrack: task(function * (channel) {
		const tracks = yield channel.get('tracks');
		return tracks.get('lastObject');
	}).drop(),

	findRandomChannel: task(function * () {
		let cache = get(this, 'store').peekAll('channel');
		let channel;

		// Very small cache so we try to fetch more.
		if (!get(this, 'didCache') && cache.get('length') > 3) {
			Ember.debug('small cache, fetching more channels');
			cache = yield get(this, 'store').findAll('channel');
			// cache = yield this.findLast(10, 'channel');
			set(this, 'didCache', true);
		}

		// Pick a channel.
		channel = cache.objectAt(randomIndex(cache));

		// If the channel is empty, pick one with more tracks.
		if (channel.get('totalTracks') < 1) {
			cache = cache.filter(c => c.get('totalTracks') > 1);
			channel = cache.objectAt(randomIndex(cache));
		}

		return channel;
	}).keepLatest()
});