import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Service, debug, inject} = Ember;

const randomIndex = array => Math.floor(Math.random() * array.get('length'));

export default Service.extend({
	store: inject.service(),
	player: inject.service(),

	playAnotherRadio: task(function * (prev) {
		let channel = yield this.findRandomChannel();
		// If a `prev` channel is passed, we call the function again to avoid getting the same channel twice.
		while (prev && prev.id === channel.id) {
			debug('found the same "random" radio, let us try again');
			channel = yield this.findRandomChannel();
		}
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

	// This returns a single, ramdom channel while doing effecient queries
	// e.g. first it finds all records, then looks to the cache
	findRandomChannel() {
		let channel;
		let items = null;
		let filtered;

		debug('findRandomChannel');

		return new Ember.RSVP.Promise(resolve => {
			const cachedChannels = this.get('store').peekAll('channel');
			const isCached = cachedChannels.get('length');
			if (isCached >= 2) {
				items = cachedChannels;
				channel = items.objectAt(randomIndex(items));
				if (channel.get('totalTracks') < 1) {
					// Only filter the channels if necessary. This method is called often #performance
					filtered = items.filter(c => c.get('totalTracks') > 5);
					channel = filtered.objectAt(randomIndex(filtered));
				}
				resolve(channel);
			} else {
				// items = this.findLast(10, 'channel');
				this.get('store').findAll('channel').then(channels => {
					Ember.debug('avoid this being called, it is heavy');
					items = channels;
					filtered = channels.filter(c => c.get('totalTracks') > 5);
					if (Ember.isEmpty(filtered)) {
						filtered = channels.filter(c => c.get('totalTracks') > 0);
					}
					channel = filtered.objectAt(randomIndex(filtered));
					resolve(channel);
				});
			}
		}).catch(err => Ember.debug(err));
	}
});
