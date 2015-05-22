import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
	// 1. filter out the featured models
	filtered: computed.filter('model.popular', function(item) {
		return !item.get('isFeatured');
	}),
	// 2. sort them by followers
	sortProperties: ['channelPublic.followers.length:desc'],
	sorted: computed.sort('filtered', 'sortProperties'),

	// 3. return the top X items
	popular: computed('sorted.[]', function() {
		return this.get('sorted').slice(0, 10);
	})
});
