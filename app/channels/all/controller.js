import Ember from 'ember';

const { debug, computed } = Ember;

export default Ember.Controller.extend({
	queryParams: ['filter'],
	sortProperties: ['title:asc'],
	alphabetical: computed.sort('model', 'sortProperties'),

	// filters the array with our search value
	filtered: computed('filter', function() {
		let filter = this.get('filter');
		let rx = new RegExp(filter, 'gi');

		if (!filter) { return; }

		return this.get('model').filter((item) => {
			return rx.test(item.get('title')) || rx.test(item.get('body'));
		});
	}),

	// if we're searching, return those filtered channels otherwise all
	channels: computed('filter', function() {
		if (this.get('filter')) {
			return this.get('filtered');
		} else {
			return this.get('alphabetical');
		}
	})
});
