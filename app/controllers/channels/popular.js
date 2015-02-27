import Ember from 'ember';

export default Ember.ArrayController.extend({

	// this is just the first five
	// @todo figure out popular radios
	filteredContent: function() {
		return this.get('content').slice(0,5);
	}.property('content.[]'),
});
