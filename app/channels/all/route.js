import Ember from 'ember';

const {Route, get} = Ember;

// Lets you call a promise while something is true.
// function promiseWhile(condition, body) {
// 	return new RSVP.Promise((resolve, reject) => {

// 		function loop() {
// 			RSVP.Promise.resolve(condition()).then(result => {
// 				// When the result of calling `condition` is no longer true, we are done.
// 				if (!result) {
// 					resolve();
// 				} else {
// 					// When it completes loop again otherwise, if it fails, reject
// 					RSVP.Promise.resolve(body()).then(loop, reject);
// 				}
// 			});
// 		}

// 		// Start running the loop
// 		loop();
// 	});
// }

// Set to either 'limitToLast' or 'limitToFirst' to
// find items from newest or oldest.
const LIMIT_TO_DYNAMIC = 'limitToLast';
const PAGE_SIZE = 15;

export default Route.extend({
	startAt: null,
	endAt: null,

	// When search changes the url, don't replace the history.
	// e.g. back/forth in browser works as expected.
	queryParams: {
		search: {
			replace: true
		}
	},

	model() {
		// All channels without doing a request. This way the array updates
		// while we fetch more channels in the background.
		return this.store.peekAll('channel');
		// return this.store.find('channel', {orderBy: 'published', limitToLast: 5})
		// return this.store.query('channel', {orderBy: 'category', startAt: 1, endAt: 1})
		// get oldest
		// return this.store.query('channel', {limitToLast: 5});
		// get newest
		// return this.store.query('channel', {limitToFirst: 5});
		// return this.store.query('channel', {startAt: '-J_Gj6nryBGVLHrmfZ10'});
	},

	afterModel() {
		// v1: Load more channels in the background.
		// this.findChannels(5).then(() => {
			// this.findChannels(20).then(() => {
			// 	this.findChannels().then(() => {
			// 		// all channels are loaded
			// 	});
			// });
		// });

		if (this.get('didLoadAll')) {
			return;
		}

		// v2: load with a pager (avoids fetching duplicate channels)
		// console.time('findPrev1');
		this.store.findAll('channel').then(() => {
			// console.timeEnd('Query the rest of the channels');
			this.set('didLoadAll', true);
		});
		// this.findPrev().then(() => {
			// console.timeEnd('findPrev1');

			// console.time('findPrev2');
			// this.findPrev().then(data => {
			// 	console.timeEnd('findPrev2');
			// });

			// Ember.run.schedule('later', () => {
				// console.time('Find all channels');
				// this.store.findAll('channel').then(() => {
				// 	console.timeEnd('Find all channels');
				// });

				// console.time('Query the rest of the channels');
			// });
		// });

		// v3 WIP: loop through promises
		// let looper = 20;
		// promiseWhile(() => looper > 0, () => {
		// 	return this.findPrev().then(data => {
		// 		console.log(data.get('length'));
		// 		// looper = data.get('length');
		// 		looper--;
		// 	});
		// }).then(() => {
		// 	console.log('done');
		// });
	},

	// Constructs an emerfire query supporting pagination.
	// Inspired by https://github.com/firebase/emberfire/issues/248
	findPaginated() {
		const query = {};

		query[LIMIT_TO_DYNAMIC] = PAGE_SIZE + 1;

		if (this.get('startAt')) {
			query.startAt = this.get('startAt');
		}

		if (this.get('endAt')) {
			query.endAt = this.get('endAt');
			query[LIMIT_TO_DYNAMIC] = PAGE_SIZE + 1;
		}

		return this.store.query('channel', query);
	},

	// Returns either all or a limited query of a model type.
	// example: findChannels('track', 999);
	// @todo get rid of this and extend `findPaginated`
	findChannels(howMany) {
		const modelType = 'channel';
		if (howMany) {
			return this.store.query(modelType, {limitToLast: howMany});
		}
		return this.store.findAll(modelType, {reload: true});
	},

	findPrev() {
		const model = this.get('currentModel');
		let id;
		this.set('startAt', null);
		if (model) {
			if (this.get('endAt')) {
				id = get(model, 'lastObject.id');
			} else {
				id = get(model, 'firstObject.id');
			}
			this.set('endAt', id);
		}
		return this.findPaginated();
	},

	findNext() {
		const model = this.get('currentModel');
		const id = get(model, 'lastObject.id');
		this.set('startAt', id);
		this.set('endAt', null);
		this.findPaginated();
	},

	actions: {
		prev() {
			this.findPrev();
		},
		next() {
			this.findNext();
		}
	}
});
