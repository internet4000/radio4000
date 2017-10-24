import Ember from 'ember'
import { array } from 'ember-awesome-macros'
import {raw} from 'ember-awesome-macros/raw'

const { Component } = Ember

export default Component.extend({
	classNames: ['Tracks'],
	items: null,
	numbered: false,
	grouped: false,

	// Newest on top.
	sortedItems: array.sort('items', ['created:desc']),

	// Tracks grouped by month.
	groupedItems: array.groupBy('sortedItems', raw('createdMonth'))
})
