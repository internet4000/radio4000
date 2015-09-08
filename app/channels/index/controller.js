import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

	// This depends on getting all public channels
	// which we currently do in channel:route afterModel().
	channels: computed(function() {
		return this.store.findAll('channel');
	}),

	// Only include non-featured channels an image and minimum X followers.
	filtered: computed('channels.[]', function() {
		return this.get('channels').filter((items) => {
			return !items.get('isFeatured') &&
				 	 	 items.get('coverImage') &&
						 items.get('channelPublic.followers.length') > 6;
		});
	}),

	sortProperties: ['channelPublic.followers.length:desc'],
	popular: computed.sort('filtered', 'sortProperties')

	// optional slice (to limit max popular items)
	// popularLimited: computed('popular.[]', function() {
	// 	return this.get('popular').slice(0, 10);
	// })
});
