/* eslint ember/no-on-calls-in-components:0 */

import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import { EKMixin, keyUp } from 'ember-keyboard'
import raw from 'ember-macro-helpers/raw'

const { Component, computed, set, get } = Ember

export default Component.extend(EKMixin, {
	classNames: ['TracksList'],
	classNameBindings: ['searchQuery:is-searching'],
	items: null,
	grouped: false,
	numbered: false,
	searchQuery: '',
	canLocate: false,

	noSearchQuery: computed.not('searchQuery'),

	// Items sorted newest first
	sortedItems: array.sort('items', ['created:desc']),

	// Items grouped by month
	groupedItems: array.groupBy('sortedItems', raw('createdMonth')),

	focusSearch: Ember.on(keyUp('shift+KeyS'), function() {
		this.element.querySelector('input[type="search"]').focus()
	}),

	didRender() {
		const locate = get(this, 'locate');
		if (locate) {
			this.send('locateActiveTrack')
		}
	},

	actions: {
		clearSearchQuery() {
			set(this, 'searchQuery', '')
		},
		locateActiveTrack() {
			const $track = document.querySelector(`.Track.Track--live`)
			if ($track) {
				$track.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				})
				// so it does not keep scroll each time it renders
			}
			set(this, 'locate', null)
		}
	}
})
