import Ember from 'ember';

export default Ember.ArrayController.extend({
	// only show featured items
	// featured: function() {
	// 	return this.get('model').filterBy('isFeatured');
	// }.property('model.@each.isFeatured'),

	// sort by followers
	maxPopular: 16,
	sortProperties: ['followers.length'],
	sortAscending: false,

	// filter the arranged content
	popular: function() {
		return this.get('arrangedContent').slice(0,this.get('maxPopular'));
	}.property('arrangedContent')
});
