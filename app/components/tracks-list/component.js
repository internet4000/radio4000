import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import raw from 'ember-macro-helpers/raw'

const { Component, $, inject, computed, get, set } = Ember

export default Component.extend({
	player: inject.service(),
	classNames: ['Tracks'],
	items: null,
	numbered: false,
	grouped: false,

	searchQuery: '',
	searchResultTrackIds: [],
	cannotPlay: computed.not('searchQuery'),

	// Newest on top.
	sortedItems: array.sort('items', ['created:desc']),

	// Tracks grouped by month.
	/* groupedItems: array.groupBy('sortedItems', raw('createdMonth')),
		 groupedSearchedItems: array.groupBy('searchedItems', raw('createdMonth')),*/

	getTrackIdsFromSearch: function() {
		return this.getTrackIdsFromEls ($('#TrackList .List-item:visible'));
	},

	getTrackIdsFromEls: function(els) {
		return $.map(els, el => {
			const attr = el.getAttribute('data-track-id')
			return attr
		})
	},

	performSearchOnModels: function() {
		set(this, 'searchResultTrackIds', this.getTrackIdsFromSearch())
	},

	didUpdate() {
		console.log('didUpdate')
		Ember.run.debounce(this, this.performSearchOnModels, 400)
	},

	actions: {
		playSelection() {
			const player = get(this, 'player');
			const trackIds = get(this, 'searchResultTrackIds');

			get(this, 'items.firstObject.channel').then(channel => {
				const playlist =  player.buildPlaylistExport(channel, trackIds);
				player.loadPlayistInWebComponent(playlist)
			})
		}
	}
})
