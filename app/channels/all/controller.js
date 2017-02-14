import Ember from 'ember';

const {Controller, get, set, computed} = Ember;

export default Controller.extend({
	search: '',
	queryParams: ['search'],
	isList: false,
	sortKey: 'created',
	sortDirection: 'desc',
	searchResults: null,

	// Only show channels that have tracks.
	filteredChannels: computed.filter('model', m => m.get('totalTracks')),

	// Either show filtered or search-result channels.
	channels: computed('filteredChannels', 'searchResults', function () {
		let filtered = get(this, 'filteredChannels');
		let searchResults = get(this, 'searchResults');
		return searchResults ? searchResults : filtered;
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
