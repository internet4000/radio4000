import Ember from 'ember';

export default Ember.ArrayController.extend({
	// this page shows all channels
	// and is filterable
	sortProperties: ['created'],
	sortAscending: false,

	// if we're searching, return those filtered channels otherwise all
	channels: Ember.computed('search', 'filteredChannels', function() {
		return this.get('search') ? this.get('filteredChannels') : this;
	}),

	// filters the array with our search value
	filteredChannels: Ember.computed('search', function() {
		var filter = this.get('search');
		var rx = new RegExp(filter, 'gi');

		if (!filter) { return; }

		return this.filter(function(channel) {
			return rx.test(channel.get('title')) || rx.test(channel.get('body'));
		});
	}),

	actions: {
		sortBy(property) {
			this.set('sortProperties', [property]);
			this.set('sortAscending', !this.get('sortAscending'));
		}
	}
});
