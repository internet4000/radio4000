import Ember from 'ember';

export default Ember.ArrayController.extend({
	max: 10,

	// sort by followers
	sortProperties: ['followers'],
	sortAscending: true,

	// filter the arranged content
	filteredContent: function() {
		return this.get('arrangedContent').slice(0,this.get('max'));
	}.property('arrangedContent.[]')
});
