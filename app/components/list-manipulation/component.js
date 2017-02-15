import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	list: null,
	sortKey: 'updated',
	sortDesc: true,
	manipulatedList: computed.sort('list', 'sortDefinition'),
	sortDefinition: computed('sortKey', 'sortDesc', function () {
		let sortKey = get(this, 'sortKey');
		let sortDesc = get(this, 'sortDesc');
		let direction;

		if (sortDesc) {
			direction = 'desc';
		} else {
			direction = 'asc';
		}

		return [`${sortKey}:${direction}`];
	}),

	setSortKey(key) {
		this.setProperties({
			sortKey: key,
			sortDesc: true
		});
	},
	toggleSetSortKey(key) {
		if (key === get(this, 'sortKey')) {
			this.toggleProperty('sortDesc');
		} else {
			this.setSortKey(key);
		}
	},

	actions: {
		// one action decides what to do, if toggle=true
		updateSorting(key, toggleSorting) {
			if (toggleSorting) {
				this.toggleSetSortKey(key);
			} else {
				this.setSortKey(key);
			}
		}
	}
});
