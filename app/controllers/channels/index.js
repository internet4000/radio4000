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
});
