import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['playback'],
	playback: Ember.computed.alias('controllers.playback'),

	// True if session user's channel is the same as this model
	canEdit: function() {
		return this.get('model') === this.get('session.userChannel');
	}.property('model', 'session.userChannel'),

	actions: {
		play: function() {
			// Either continues play or plays the newest e.g. last track
			if (this.get('playback.model')) {
				this.get('playback.player').send('play');
			} else {
				this.transitionToRoute('track', this.get('tracks.lastObject'));
			}
		},
		pause: function() {
			this.get('playback.player').send('pause');
		},
		toggleFavorite: function() {
			var userChannel = this.get('session.userChannel');
			var userFavorites = userChannel.get('favoriteChannels');
			var channel = this.get('model');
			var channelFollowers = channel.get('followers');
			var isFavorite = this.get('isFavorite');

			if (isFavorite) {
				userFavorites.removeObject(channel);
				channelFollowers.removeObject(userChannel);
			} else {
				userFavorites.addObject(channel);
				channelFollowers.addObject(userChannel);
			}

			userChannel.save();
			channel.save();
		}
	},

	// If the current user's favoriteChannels contains this channel
	// it's a favorite…
	isFavorite: function() {
		var channel = this.get('model');
		var userFavorites = this.get('session.userChannel.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!userFavorites) { return false; }

		return userFavorites.contains(channel);
	}.property('model', 'session.userChannel.favoriteChannels.@each'),
});
