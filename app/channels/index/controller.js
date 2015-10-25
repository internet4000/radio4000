import Ember from 'ember';

const {computed} = Ember;

export default Ember.Controller.extend({
	// This depends on getting all public channels
	// which we currently do in channel:route afterModel().
	channels: computed(function () {
		return this.store.findAll('channel');
	}),

	// Filter popular channels
	filteredChannels: computed.filter('channels', function (channel) {
		return !channel.get('isFeatured') &&
           channel.get('coverImage') &&
           channel.get('channelPublic.followers.length') > 6;
	}),

	// Sort the filteredChannels by followers
	sortProperties: ['channelPublic.followers.length:desc'],
	sortedChannels: computed.sort('filteredChannels', 'sortProperties'),

	// And only show top X
	topSortedChannels: computed('sortedChannels.[]', function () {
		return this.get('sortedChannels').slice(0, 4);
	}),

	currentUserFavorites: computed('session', function () {
		// find logged in user favorite channels
		return this.get('session.currentUser.channels.firstObject.favoriteChannels');
	})
});
