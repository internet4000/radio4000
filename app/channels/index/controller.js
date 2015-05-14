import Ember from 'ember';

export default Ember.Controller.extend({
	// 1. filter out the featured models
	filtered: Ember.computed.filter('model.popular', function(item) {
		return !item.get('isFeatured');
	}),
	// 2. sort them by followers
	sortProperties: ['channelPublic.followers.length:desc'],
	sorted: Ember.computed.sort('filtered', 'sortProperties'),

	// 3. return the top X items
	popular: Ember.computed('sorted.[]', function() {
		return this.get('sorted').slice(0, 10);
	})
});
