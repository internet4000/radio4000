import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	list: null,
	sortKey: 'updated:desc',
	sortDefinition: computed.collect('sortKey'),
	sortedList: computed.sort('list', 'sortDefinition')
});
