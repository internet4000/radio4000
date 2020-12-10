import Controller from 'radio4000/sorting/controller'
import {computed, set} from '@ember/object'
import {conditional} from 'ember-awesome-macros'

export default Controller.extend({
	queryParams: ['search'],
	search: '',
	searchResults: null,

	// Only show channels that have tracks.
	// channels: computed.filter('model', track => track.get('totalTracks')),

	// Either show filtered or search-result channels.
	// filteredChannels: computed('channels', 'searchResults', function() {
	// 	const channels = get(this, 'channels')
	// 	const searchResults = get(this, 'searchResults')
	// 	return searchResults ? searchResults : channels
	// }),

	filteredChannels: conditional('searchResults', 'searchResults', 'model'),

	noSearch: computed.not('search'),

	actions: {
		clearSearch() {
			set(this, 'search', '')
		}
	}
})
