import Ember from 'ember';

const {Service, inject} = Ember;

const randomIndex = array => Math.floor(Math.random() * array.get('length'));

export default Service.extend({
	store: inject.service(),

	findLast(x, type) {
		return this.get('store').query(type, {limitToLast: x});
	},

	findRandomChannel() {
		// This returns a single, ramdom channel while doing effecient queries
		// e.g. first it finds all records, then looks to the cache
		return new Ember.RSVP.Promise(resolve => {
			const isCached = this.get('store').peekAll('channel').get('length');
			let items = null;
			if (isCached >= 20) {
				items = this.get('store').peekAll('channel');
				const filtered = items.filter(c => c.get('totalTracks') > 5);
				const channel = filtered.objectAt(randomIndex(filtered));
				resolve(channel);
			} else {
				items = this.get('store').findAll('channel');
				// items = this.findLast(10, 'channel');
				items.then(channels => {
					const filtered = channels.filter(c => c.get('totalTracks') > 5);
					const channel = filtered.objectAt(randomIndex(filtered));
					resolve(channel);
				});
			}
		}).catch(error => {
			throw new Error(error);
		});
	},

	findLastTrack(channel) {
		if (!channel) {
			throw new Error('no channel');
		}
		return channel.get('tracks').then(tracks => tracks.get('lastObject'));
	}
});

// playSomething() {
// 	this.get('randomChannel').then(channel => {
// 		channel.get('tracks').then(tracks => {
// 			const track = tracks.objectAt(randomIndex(tracks));
// 			this.get('player').playTrack(track);
// 		});
// 	});
// }
// randomTrack() {
	// this.store.query('channel', {limitToLast: 5}).then(channels => {
	// 	const channel = channels.filter(c => c.get('tracks.length')).objectAt(randomIndex(channels));
	// 	channel.get('tracks').then(tracks => {
	// 		const track = tracks.objectAt(randomIndex(tracks));
	// 		this.get('player').playTrack(track);
	// 	});
	// });
// }
