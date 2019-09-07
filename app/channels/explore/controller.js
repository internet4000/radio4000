import Ember from 'ember'
import Controller from 'radio4000/sorting/controller'

const {get, set, computed} = Ember

export default Controller.extend({
	queryParams: ['search'],
	search: '',
	searchResults: null,

	// Only show channels that have tracks.
	channels: computed.filter('model', m => m.get('totalTracks')),

	// Either show filtered or search-result channels.
	filteredChannels: computed('channels', 'searchResults', function() {
		const channels = get(this, 'channels')
		const searchResults = get(this, 'searchResults')
		return searchResults ? searchResults : channels
	}),

	noSearch: computed.not('search'),

	actions: {
		clearSearch() {
			set(this, 'search', '')
		}
	}
})
