import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	list: null,
	sortKey: 'updated',
	sortDirection: 'desc',
	manipulatedList: computed.sort('list', 'sortDefinition'),
	sortDefinition: computed('sortKey', 'sortDirection', function () {
		const sortKey = get(this, 'sortKey');
		const sortDirection = get(this, 'sortDirection');

		return [`${sortKey}:${sortDirection}`];
	})
});
