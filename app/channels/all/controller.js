import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['filter'],
	sortProperties: ['title:asc'],
	alphabetical: Ember.computed.sort('model', 'sortProperties'),

	// filters the array with our search value
	filtered: Ember.computed('filter', function() {
		let filter = this.get('filter');
		let rx = new RegExp(filter, 'gi');

		if (!filter) { return; }

		return this.get('model').filter((item) => {
			return rx.test(item.get('title')) || rx.test(item.get('body'));
		});
	}),

	// if we're searching, return those filtered channels otherwise all
	channels: Ember.computed('filter', function() {
		if (this.get('filter')) {
			return this.get('filtered');
		} else {
			return this.get('alphabetical');
		}
	})

	// actions: {
	// 	sortBy(property) {
	// 		this.set('sortProperties', [property]);
	// 		this.set('sortAscending', !this.get('sortAscending'));
	// 	}
	// }
});
