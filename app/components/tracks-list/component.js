import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import { EKMixin, keyUp } from 'ember-keyboard'
import raw from 'ember-macro-helpers/raw'
import { debounce } from '@ember/runloop'

const { Component, $, inject, computed, get, set } = Ember

export default Component.extend(EKMixin, {
	player: inject.service(),
	classNames: ['Tracks'],
	items: null,
	numbered: false,
	grouped: false,
	searchQuery: '',
	/* selection: [],*/
	selection: computed('searchQuery', function() {
		const $els = $('.ListGroup .List-item:visible')
		console.log('$els', $els)
		const ids = $.map($els, el => el.getAttribute('data-track-id'))
		if(ids.length) {
			return ids
		} else {
			return [];
		}
	}),
	noSearchQuery: computed.not('searchQuery'),

	// Newest on top.
	sortedItems: array.sort('items', ['created:desc']),

	focusSearch: Ember.on(keyUp('shift+KeyS'), function() {
		this.element.querySelector('input[type="search"]').focus()
	}),

	// Tracks grouped by month.
	groupedItems: array.groupBy('sortedItems', raw('createdMonth')),

	actions: {
		clearSearchQuery() {
			set(this, 'searchQuery', '')
		},
		playSelection() {
			const player = get(this, 'player')
			const selection = get(this, 'selection')
			console.log('selection', selection)
			if(selection.length) {
				get(this, 'items.firstObject.channel').then(channel => {
				const playlist = player.buildPlaylistExport(
					channel,
					selection,
					get(this, 'searchQuery')
				)
				player.loadPlayistInWebComponent(playlist)
				})
			}
		}
	}
})
