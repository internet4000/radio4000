import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import raw from 'ember-macro-helpers/raw'

const { Component, computed, get } = Ember

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
	groupedItems: array.groupBy('sortedItems', raw('createdMonth')),

	groupedSearchedItems: array.groupBy('searchedItems', raw('createdMonth')),

	searchedItems: computed('searchQuery', 'sortedItems', function() {
		const search = get(this, 'searchQuery')
			.split(' ')
			.join('|');
		const re = new RegExp(search, 'gi')

		const tracks = get(this, 'items')
		const selection = [];

		console.log('re', re)
		tracks.forEach(track => {
			if (track.get('searchableData').search(re) > 0) {
				selection.push(track)
			}
		})
		return selection;
		/* return selection.map(i => i.get('searchableData'));*/
	}),

	actions: {
		playSelection() {
			const s = get(this, 'searchedItems');
			console.log('sss', s)
		}
	}
})
