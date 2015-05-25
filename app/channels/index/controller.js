import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
	sortProperties: ['channelPublic.followers.length:desc'],

	// 1. filter out the featured models
	featured: computed.filterBy('model', 'isFeatured'),

	// 1. filter out the featured models
	filtered: computed.filter('model', function(item) {
		return !item.get('isFeatured');
	}),

	// 2. sort them by followers
	sorted: computed.sort('filtered', 'sortProperties'),

	// 3. return the top X items
	popular: computed('sorted.[]', function() {
		return this.get('sorted').slice(0, 10);
	})
});
