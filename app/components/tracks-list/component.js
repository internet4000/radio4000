import Ember from 'ember';

export default Ember.Component.extend({

	// not sure how to set up SortableMixin
	sorted: Ember.computed('', function() {
		return Ember.ArrayController.create({
			content : this.get('model'),

			// Newest on top
			sortProperties: ['created'],
			sortAscending: false
		});
	}),

	// Keep track of which track we're currently editing
	currentTrackComponent: null
});
