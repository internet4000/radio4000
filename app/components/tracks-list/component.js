import Ember from 'ember';

export default Ember.Component.extend({

	// sorts our items newest on top
	sortedItems: Ember.computed('items', function () {
		return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
			sortProperties: ['created'],
			sortAscending: false,
			content: this.get('items')
		});
	})
});
