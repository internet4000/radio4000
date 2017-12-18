import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import raw from 'ember-macro-helpers/raw'

const { Component, $, computed, get, set } = Ember

export default Component.extend({
	classNames: ['Tracks'],
	items: null,
	numbered: false,
	grouped: false,

	searchQuery: '',
	searchResultTrackIds: [],
	cannotPlay: computed.not('searchQuery'),

	// Newest on top.
	sortedItems: array.sort('items', ['created:desc']),
	itemsForSearch: computed.oneWay('sortedItems'),

	cssListCopy: computed('sortedItems', function() {
		get(this, 'sortedItems')
	}),

	// Tracks grouped by month.
	/* groupedItems: array.groupBy('sortedItems', raw('createdMonth')),
		 groupedSearchedItems: array.groupBy('searchedItems', raw('createdMonth')),*/

	getTrackIdsFromSearch: function() {
		return this.getTrackIdsFromNodeList ($('#TrackList .List-item:visible'));
	},

	getTrackIdsFromNodeList: function(nl) {
		return Array.from(nl).map(item => item.attributes['data-track-id'].value)
	},

	performSearchOnModels: function() {
		const trackIds = this.getTrackIdsFromSearch();
		console.log('trackIds', trackIds)
	},

	didUpdate() {
		console.log('didUpdate')
		Ember.run.debounce(this, this.performSearchOnModels, 400)
	},

	actions: {
		playSelection() {
		}
	}
})
