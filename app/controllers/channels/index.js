import Ember from 'ember';

export default Ember.ArrayController.extend({
	// sort by followers
	maxPopular: 16,
	sortProperties: ['followers.length'],
	sortAscending: false,

	// get the sorted content and limit it by our max
	popular: function() {
		return this.get('arrangedContent').slice(0,this.get('maxPopular'));
	}.property('arrangedContent')

	// only show featured items
	// ,featured: function() {
	// 	return this.get('model').filterBy('isFeatured');
	// }.property('model.@each.isFeatured')
});
