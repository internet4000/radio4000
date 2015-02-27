import Ember from 'ember';

export default Ember.ArrayController.extend({
	// only show featured items
	featured: function() {
		return this.get('model').filterBy('isFeatured');
	}.property('model.@each.isFeatured')
});
