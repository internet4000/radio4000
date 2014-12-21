import Ember from 'ember';

export default Ember.ArrayController.extend({
	// Sort by newest on top
	sortProperties: ['created', 'title'],
	sortAscending: false,

	// returns the filtered channels if we are searching,
	// otherwise the default array
	channels: function() {
		return this.get('search') ? this.get('filteredChannels') : this;
	}.property('search', 'filteredChannels'),

	// shuffled: function() {
	// 	return this.shuffle(this.get('model'));
	// }.property('model'),

	// filters the array with our search value
	filteredChannels: function() {
		var search = this.get('search');
		if (!search) { return; }
		return this.filter(function(channel) {
			return channel.get('title').toLowerCase().indexOf(search.toLowerCase()) !== -1;
		});
	}.property('search'),

	actions: {
		sortBy: function(property) {
			this.set('sortProperties', [property]);
			this.set('sortAscending', !this.get('sortAscending'));
		}
	}
	// ,

	// shuffle: function(array) {
	//  var currentIndex, randomIndex, temporaryValue;

	//  currentIndex = array.get('length');

	//  while (currentIndex !== 0) {
	// 	randomIndex = Math.floor(Math.random() * currentIndex);
	// 	currentIndex--;
	// 	temporaryValue = array.objectAt(currentIndex);
	// 	array.replace(currentIndex, 1, [array.objectAt(randomIndex)]);
	// 	array.replace(randomIndex, 1, [temporaryValue]);
	//  }

	//  return array;
 //  }
});
