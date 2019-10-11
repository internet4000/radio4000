/* eslint ember/no-on-calls-in-components:0 */

import Component from '@ember/component'
import {computed, set, get} from '@ember/object'
import {on} from '@ember/object/evented'
import { EKMixin, keyUp } from 'ember-keyboard'
import { array } from 'ember-awesome-macros'

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
	groupKey: 'createdMonth',
	groupedItems: array.groupBy('sortedItems', 'groupKey'),

	focusSearch: on(keyUp('shift+KeyS'), function() {
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
