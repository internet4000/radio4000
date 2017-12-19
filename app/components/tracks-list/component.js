import Ember from 'ember'
import { array } from 'ember-awesome-macros'
// import raw from 'ember-macro-helpers/raw'

const { Component, $, inject, computed, get, set } = Ember

export default Component.extend({
	player: inject.service(),
	classNames: ['Tracks'],
	items: null,
	numbered: false,
	grouped: false,

	searchQuery: '',
	noSearchQuery: computed.not('searchQuery'),
	searchResultTrackIds: [],
	cannotPlay: computed.not('searchQuery'),

	// Newest on top.
	sortedItems: array.sort('items', ['created:desc']),

	// Tracks grouped by month.
	// groupedItems: array.groupBy('sortedItems', raw('createdMonth')),
	// groupedSearchedItems: array.groupBy('searchedItems', raw('createdMonth')),

	didUpdate() {
		this.performSearchOnModels()
	},

	performSearchOnModels() {
		const $els = $('#TrackList .List-item:visible')
		const ids = $.map($els, el => el.getAttribute('data-track-id'))
		set(this, 'searchResultTrackIds', ids)
	},

	actions: {
		clearSearchQuery() {
			set(this, 'searchQuery', '');
		},
		playSelection() {
			const player = get(this, 'player');
			const trackIds = get(this, 'searchResultTrackIds');

			get(this, 'items.firstObject.channel').then(channel => {
				const playlist = player.buildPlaylistExport(channel, trackIds);
				player.loadPlayistInWebComponent(playlist)
			})
		}
	}
})
