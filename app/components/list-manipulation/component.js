import Ember from 'ember';

const {Component, computed, set, get} = Ember;

export default Component.extend({
	list: null,
	sortKey: 'updated',
	sortDirection: 'asc',

	sortDefinition: computed('sortKey', 'sortDirection', function () {
		return [].addObject(get(this, 'sortKey') + ':' + get(this, 'sortDirection'));
	}),
	manipulatedList: computed.sort('list', 'sortDefinition'),
	actions: {
		setSortKey(key) {
			if (get(this, 'sortKey') === key) {
				return this.send('toggleSortDirection');
			}
			set(this, 'sortKey', key);
		},
		toggleSortDirection() {
			if (get(this, 'sortDirection') === 'asc') {
				set(this, 'sortDirection', 'desc');
				return;
			}
			set(this, 'sortDirection', 'asc');
		}
	}
});
