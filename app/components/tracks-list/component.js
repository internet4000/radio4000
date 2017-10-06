import { sort } from '@ember/object/computed';
import Component from '@ember/component';
import groupBy from 'radio4000/utils/group-by';

export default Component.extend({
	classNames: ['Tracks'],
	items: null,
	numbered: false,

	// sorts our items newest on top
	sortKeys: ['created:desc'],
	sortedItems: sort('items', 'sortKeys'),
	groupedItems: groupBy('sortedItems', 'createdMonth')
});
