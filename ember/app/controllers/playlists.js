import Ember from 'ember';

export default Ember.ArrayController.extend({
	// Sort by newest on top
	sortProperties: ['created'],
	sortAscending: false
});
