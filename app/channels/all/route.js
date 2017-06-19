import Ember from 'ember';

const {Route, get} = Ember;

// Set to either 'limitToLast' or 'limitToFirst' to
// find items from newest or oldest.
// const LIMIT_TO_DYNAMIC = 'limitToLast';
// const PAGE_SIZE = 15;

export default Route.extend({
	// startAt: null,
	// endAt: null,
	didLoadAll: false,

	model() {
		const store = this.store;

		// Load all channels but don't return them,
		// to not block the UI. We only need this once per session.
		if (!get(this, 'didLoadAll')) {
			store.findAll('channel'); // all
			this.set('didLoadAll', true)
		}

		return store.peekAll('channel'); // cached
	}

	// findPrev() {
	// 	const model = this.get('currentModel');
	// 	let id;
	// 	this.set('startAt', null);
	// 	if (model) {
	// 		if (this.get('endAt')) {
	// 			id = get(model, 'lastObject.id');
	// 		} else {
	// 			id = get(model, 'firstObject.id');
	// 		}
	// 		this.set('endAt', id);
	// 	}
	// 	return this.findPaginated();
	// },

	// findNext() {
	// 	const model = this.get('currentModel');
	// 	const id = get(model, 'lastObject.id');
	// 	this.set('startAt', id);
	// 	this.set('endAt', null);
	// 	this.findPaginated();
	// },

	// Constructs an emerfire query supporting pagination.
	// Inspired by https://github.com/firebase/emberfire/issues/248
	// findPaginated() {
	// 	let startAt = this.get('startAt');
	// 	let endAt = this.get('endAt');
	// 	let query = {};
	// 	query[LIMIT_TO_DYNAMIC] = PAGE_SIZE + 1;

	// 	if (startAt) {
	// 		query.startAt = startAt;
	// 	}

	// 	if (endAt) {
	// 		query.endAt = endAt;
	// 		query[LIMIT_TO_DYNAMIC] = PAGE_SIZE + 1;
	// 	}

	// 	return this.store.query('channel', query);
	// },

	// actions: {
	// 	prev() {
	// 		this.findPrev();
	// 	},
	// 	next() {
	// 		this.findNext();
	// 	}
	// }
});

