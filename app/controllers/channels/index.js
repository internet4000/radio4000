import Ember from 'ember';

export default Ember.ArrayController.extend({
	sortProperties: ['created', 'title'],
	sortAscending: false,
	// Sort by random initially
	// sortFunction: function(x, y) {
	// 	return 0.5 - Math.random();
	// 	// var currentIndex, randomIndex, temporaryValue;

	// 	// var array = this;
	// 	// currentIndex = array.get('length');

	// 	// while (currentIndex !== 0) {
	// 	// 	randomIndex = Math.floor(Math.random() * currentIndex);
	// 	// 	currentIndex--;
	// 	// 	temporaryValue = array.objectAt(currentIndex);
	// 	// 	array.replace(currentIndex, 1, [array.objectAt(randomIndex)]);
	// 	// 	array.replace(randomIndex, 1, [temporaryValue]);
	// 	// }
	// },

	// returns the filtered channels if we are searching,
	// otherwise the default array
	channels: function() {
		return this.get('search') ? this.get('filteredChannels') : this;
	}.property('search', 'filteredChannels'),

	// filters the array with our search value
	filteredChannels: function() {
		var filter = this.get('search');
    	var rx = new RegExp(filter, 'gi');

		if (!filter) { return; }

		return this.filter(function(channel) {
			return rx.test(channel.get('title')) || rx.test(channel.get('body'));
		});
	}.property('search'),

	actions: {
		sortBy: function(property) {
			this.set('sortProperties', [property]);
			this.set('sortAscending', !this.get('sortAscending'));
		}
	}
});
