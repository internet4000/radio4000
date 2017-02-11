import Ember from 'ember';

const {Component, computed, set, get} = Ember;

export default Component.extend({
	list: null,
	label: 'Sort by',
	sortKey: 'updated',
	sortDirection: 'desc',

	sortDefinition: computed('sortKey', 'sortDirection', function () {
		return [].addObject(get(this, 'sortKey') + ':' + get(this, 'sortDirection'));
	}),
	manipulatedList: computed.sort('list', 'sortDefinition'),

	setSortKey(key) {
		set(this, 'sortKey', key);
	},
	toggleSetSortKey(key) {
		if (get(this, 'sortKey') === key) {
			return this.toggleSortDirection();
		}
		this.setSortKey(key);
	},
	toggleSortDirection() {
		if (get(this, 'sortDirection') === 'asc') {
			set(this, 'sortDirection', 'desc');
			return;
		}
		set(this, 'sortDirection', 'asc');
	},
	actions: {
		// one action decides what to do, if toggle=true
		setSortKey(key, toggle) {
			if(toggle) {
				return this.toggleSetSortKey(key);
			}
			this.setSortKey(key);
		}
	}
});
