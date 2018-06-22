/* eslint ember/no-on-calls-in-components:0 */

import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import { EKMixin, keyUp } from 'ember-keyboard'
import raw from 'ember-macro-helpers/raw'
// import { debounce } from '@ember/runloop'

const { Component, computed, set } = Ember

export default Component.extend(EKMixin, {
	classNames: ['TracksList'],
	classNameBindings: ['searchQuery:is-searching'],
	items: null,
	grouped: false,
	numbered: false,
	searchQuery: '',

	noSearchQuery: computed.not('searchQuery'),

	// Items sorted newest first
	sortedItems: array.sort('items', ['created:desc']),

	// Items grouped by month
	groupedItems: array.groupBy('sortedItems', raw('createdMonth')),

	focusSearch: Ember.on(keyUp('shift+KeyS'), function() {
		this.element.querySelector('input[type="search"]').focus()
	}),

	actions: {
		clearSearchQuery() {
			set(this, 'searchQuery', '')
		}
	}
})
