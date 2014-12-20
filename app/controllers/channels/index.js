import Ember from 'ember';
//
export default Ember.Controller.extend({
	// Sort by newest on top
	sortProperties: ['created'],
	sortAscending: false,

	// returns the filtered channels if we are searching,
	// otherwise the default array
	channels: function() {
		return this.get('search') ? this.get('filteredChannels') : this.get('model');
	}.property('search', 'filteredChannels'),

	// filters the array with our search value
	filteredChannels: function() {
		var search = this.get('search').toLowerCase();
		return this.filter(function(channel) {
			return channel.get('title').toLowerCase().indexOf(search) !== -1;
		});
	}.property('search', 'model.@each.title')
});
