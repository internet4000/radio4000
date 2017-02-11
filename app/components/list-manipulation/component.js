import Ember from 'ember';

const {Component, computed, set, setProperties, get} = Ember;

export default Component.extend({
	list: null,
	label: 'Sort by',
	sortKey: 'updated',
	sortDesc: 'true',

	manipulatedList: computed.sort('list', 'sortDefinition'),

	sortDefinition: computed('sortKey', 'sortDesc', function () {
		let sortDirection;
		let sortKey = get(this, 'sortKey');

		if(get(this, 'sortDesc')) {
			sortDirection = 'desc';
		} else {
			sortDirection = 'asc';
		}

		return [`${sortKey}:${sortDirection}`];
	}),

	setSortKey(key) {
		this.setProperties({
			'sortKey': key,
			'sortDesc': true
		});
	},
	toggleSetSortKey(key) {
		if (get(this, 'sortKey') === key) {
			this.toggleSortDirection();
			return;
		}
		this.setSortKey(key);
	},
	toggleSortDirection() {
		if (get(this, 'sortDesc')) {
			set(this, 'sortDesc', false);
			return;
		}
		set(this, 'sortDesc', true);
	},
	actions: {
		// one action decides what to do, if toggle=true
		updateSorting(key, toggle) {
			if(toggle) {
				this.toggleSetSortKey(key);
				return;
			}
			this.setSortKey(key);
		}
	}
});
