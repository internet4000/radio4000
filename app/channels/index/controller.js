import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

	// note: this depends on getting all public channels
	// which we currently do in channel:route afterModel()
	channels: computed(function() {
		return this.store.findAll('channel');
	}),

	// filter out channels with more than five followers, image and not featured
	filtered: computed('channels.[]', function() {
		return this.get('channels').filter((items) => {
			return items.get('channelPublic.followers.length') > 5 &&
				 	 items.get('coverImage') &&
				 	 !items.get('isFeatured');
		});
	}),

	// sort by followers
	sortProperties: ['channelPublic.followers.length:desc'],
	popular: computed.sort('filtered', 'sortProperties')

	// optional slice (to limit max popular items)
	// popularLimited: computed('popular.[]', function() {
	// 	return this.get('popular').slice(0, 10);
	// })
});
