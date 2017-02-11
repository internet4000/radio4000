import Ember from 'ember';

const {Component, computed, set, get} = Ember;

export default Component.extend({
	list: null,
	sortKey: 'updated',
	sortDirection: 'asc',
	sortCombo: computed('sortKey', 'sortDirection', function() {
		return get(this, 'sortKey') + ':' + get(this, 'sortDirection');
	}),
	sortDefinition: computed.collect('sortCombo'),
	manipulatedList: computed.sort('list', 'sortDefinition'),
	actions: {
		setSortKey(key) {
			set(this, 'sortKey', key);
		},
		toggleSortDirection() {
			if(get(this, 'sortDirection') === 'asc') {
				return set(this, 'sortDirection', 'desc');
			}
			return set(this, 'sortDirection', 'asc')
		}
	}
});
