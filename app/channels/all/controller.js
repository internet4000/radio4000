import Ember from 'ember';

const {Controller, computed, get, set} = Ember;

export default Controller.extend({
	queryParams: ['search'],
	search: '',
	sortKey: 'created',
	sortDirection: 'desc',

	// Only show channels that have tracks.
	channels: computed.filter('model', m => m.get('totalTracks')),

	// Either show filtered or search-result channels.
	filteredChannels: computed('channels', 'searchResults', function () {
		let channels = get(this, 'channels');
		let searchResults = get(this, 'searchResults');
		return searchResults ? searchResults : channels;
	}),

	actions: {
		handleSearch(searchResults) {
			set(this, 'searchResults', searchResults);
		}
	}
});
