import Ember from 'ember';

export default Ember.ArrayController.extend({
	max: 10,

	// sort by followers
	sortProperties: ['followers.length'],
	sortAscending: false,

	// filter the arranged content
	filteredContent: function() {
		return this.get('arrangedContent').slice(0,this.get('max'));
	}.property('arrangedContent')
});
