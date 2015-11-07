import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	items: null,
	numbered: false,

	// sorts our items newest on top
	sortKeys: ['created:desc'],
	sortedItems: computed.sort('items', 'sortKeys')
});
