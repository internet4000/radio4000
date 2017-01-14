import Ember from 'ember';
import groupBy from 'ember-group-by';

const {Component, computed} = Ember;

export default Component.extend({
	items: null,
	numbered: false,
	grouped: false,

	// sorts our items newest on top
	sortKeys: ['created:desc'],
	sortedItems: computed.sort('items', 'sortKeys'),

	itemsByMonth: groupBy('sortedItems', 'createdMonth')
});
