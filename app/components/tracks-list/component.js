import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import { EKMixin, keyUp } from 'ember-keyboard'
import raw from 'ember-macro-helpers/raw'
import { debounce } from '@ember/runloop'

const { Component, $, computed, get, set } = Ember

export default Component.extend(EKMixin, {
	classNames: ['Tracks'],
	classNameBindings: ['searchQuery:is-searching'],
	items: null,
	numbered: false,
	grouped: false,
	searchQuery: '',

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
		}
	}
})
