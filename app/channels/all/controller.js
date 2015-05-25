import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
	// queryParams: ['search'],
	sortProperties: ['title:asc'],
	sorted: computed.sort('model', 'sortProperties')

	// the below doesn't work anymore
	// titles and descriptions are jumping from one model to another when filtering
	// weird.

	// // filters the array with our search value
	// filtered: computed('search', function() {
	// 	let search = this.get('search');
	// 	let rx = new RegExp(search, 'gi');
	//
	// 	if (!search) { return; }
	//
	// 	return this.get('sorted').filter((item) => {
	// 		return rx.test(item.get('title')) || rx.test(item.get('body'));
	// 	});
	// }),
	//
	// // if we're searching, return those filtered channels otherwise all
	// channels: computed('search', function() {
	// 	if (this.get('search')) {
	// 		return this.get('filtered');
	// 	} else {
	// 		return this.get('sorted');
	// 	}
	// })
});
