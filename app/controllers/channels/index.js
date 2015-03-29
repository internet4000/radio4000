import Ember from 'ember';

export default Ember.ArrayController.extend({
	// sort by followers
	maxPopular: 16,
	sortProperties: ['followers.length'],
	sortAscending: false,

	// get the sorted content and limit it by our max
	popular: Ember.computed('arrangedContent', function() {
		return this.get('arrangedContent').slice(0,this.get('maxPopular'));
	})

	// // only show featured items
	// featured: Ember.computed('model.@each.isFeatured', function() {
	// 	return this.get('model').filterBy('isFeatured');
	// })
});
