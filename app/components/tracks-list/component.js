import format from 'npm:date-fns/format';
import Ember from 'ember';
import groupBy from 'radio4000/utils/group-by';

const {Component, computed, get} = Ember;

export default Component.extend({
	classNames: ['Tracks'],
	items: null,
	numbered: false,

	// sorts our items newest on top
	sortKeys: ['created:desc'],
	sortedItems: computed.sort('items', 'sortKeys'),
	groupedItems: groupBy('sortedItems', 'createdMonth')
});
