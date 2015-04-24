import Ember from 'ember';

export default Ember.Component.extend({

	// not sure how to set up SortableMixin
	sorted: Ember.computed('model', function() {
		return Ember.ArrayController.create({
			content: this.get('model'),

			// Alphabetical
			sortProperties: ['title'],
			sortAscending: true
		});
	})
});
