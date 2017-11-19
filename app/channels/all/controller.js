import Ember from 'ember';

const {Controller, get, set, computed} = Ember;

export default Controller.extend({
	queryParams: ['search', {
    sortKey: 'sort',
		sortDirection: 'direction'
  }],
	search: '',
	searchResults: null,
	sortKey: 'updated',
	sortDirection: 'desc',

	// Only show channels that have tracks.
	channels: computed.filter('model', m => m.get('totalTracks')),

	// Either show filtered or search-result channels.
	filteredChannels: computed('channels', 'searchResults', function () {
		const channels = get(this, 'channels');
		const searchResults = get(this, 'searchResults');
		return searchResults ? searchResults : channels;
	}),

	actions: {
		changeLayout() {
			this.toggleProperty('isList');
		},
		handleSearch(searchResults) {
			set(this, 'searchResults', searchResults);
		}
	}
});
