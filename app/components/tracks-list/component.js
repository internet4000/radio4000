import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import raw from 'ember-macro-helpers/raw'

const { Component, computed, get, set } = Ember

export default Component.extend({
	classNames: ['Tracks'],
	items: null,
	numbered: false,
	grouped: false,

	searchQuery: '',
	cannotPlay: computed.not('searchQuery'),

	// Newest on top.
	sortedItems: array.sort('items', ['created:desc']),

	// Tracks grouped by month.
	/* groupedItems: array.groupBy('sortedItems', raw('createdMonth')),
		 groupedSearchedItems: array.groupBy('searchedItems', raw('createdMonth')),*/

	getTrackIdsFromSearch: function() {
		const q = get(this, 'searchQuery')
		const s = document.querySelectorAll(`#TrackList > .List-item[data-jets *= "${q}"]`);
		return Array.from(s).map(item => item.attributes['data-track-id'].value)
	},

	actions: {
		playSelection() {
			const s = this.getTrackIdsFromSearch();
			console.log('search results', s)
		}
	}
})
