import Ember from 'ember';

export default Ember.ArrayController.extend({
	featured: function() {
		return this.get('model').filterBy('isFeatured');
	}.property('model.@each.isFeatured')

	// Sort by random initially
	// sortFunction: function(x, y) {
	// 	return 0.5 - Math.random();
	// 	// var currentIndex, randomIndex, temporaryValue;

	// 	// var array = this;
	// 	// currentIndex = array.get('length');

	// 	// while (currentIndex !== 0) {
	// 	// 	randomIndex = Math.floor(Math.random() * currentIndex);
	// 	// 	currentIndex--;
	// 	// 	temporaryValue = array.objectAt(currentIndex);
	// 	// 	array.replace(currentIndex, 1, [array.objectAt(randomIndex)]);
	// 	// 	array.replace(randomIndex, 1, [temporaryValue]);
	// 	// }
	// },
});
