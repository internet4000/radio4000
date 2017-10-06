import { filter } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed, set, get } from '@ember/object';

export default Controller.extend({
	queryParams: ['search'],
	isList: false,
	search: '',
	searchResults: null,
	sortKey: 'created',
	sortDirection: 'desc',

	// Only show channels that have tracks.
	channels: filter('model', m => m.get('totalTracks')),

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
