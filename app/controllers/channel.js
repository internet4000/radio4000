import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['playback'],
	playback: Ember.computed.alias('controllers.playback'),

	lastUpdatedFormatted: Ember.computed('tracks.@each.created', function() {
		var date = this.get('tracks.lastObject.created');
		return window.moment(date).subtract(1, 'days').fromNow();
	}),

	// canEdit: Ember.computed.equal('model.id', 'session.userChannel.id'),
	canEdit: Ember.computed('model', 'session.userChannel', function() {
		var channel = this.get('model');
		var userChannel = this.get('session.userChannel');

		// avoid both props being null === null which equals true (lol)
		if (userChannel === null) { return false; }

		return channel.get('id') === userChannel.get('id');
	}),

	// If the current user's favoriteChannels contains this channel
	// it's a favorite…
	isFavorite: Ember.computed('model', 'session.userChannel.favoriteChannels.@each', function() {
		var channel = this.get('model');
		var userFavorites = this.get('session.userChannel.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!userFavorites) { return false;}
		return userFavorites.contains(channel);
	}),

	actions: {
		play() {
			// Either continues play or plays the newest e.g. last track
			if (this.get('playback.model')) {
				this.get('playback.player').send('play');
			} else {
				this.transitionToRoute('track', this.get('tracks.lastObject'));
			}
		},

		pause() {
			this.get('playback.player').send('pause');
		},

		toggleFavorite() {
			var userChannel = this.get('session.userChannel');
			var userFavorites = userChannel.get('favoriteChannels');
			var channel = this.get('model');
			var channelFollowers = null;

			// 0- check if current.channel is already a session.user.favorite (to toggle it 'in' or 'out')
			var isFavorite = this.get('isFavorite');

			// 1- update user.session favorite channel list
			if (isFavorite) {
				userFavorites.removeObject(channel);
			} else {
				userFavorites.addObject(channel);
			}
			userChannel.save();

			// 2- update channelPublic with id of follower channel
			var channelPublic = this.get('model.channelPublic').then(function(publicChannel) {
				channelFollowers = publicChannel.get('followers');

				if (isFavorite) {
					channelFollowers.removeObject(userChannel);
				} else {
					channelFollowers.addObject(userChannel);
				}
				publicChannel.save(); // save on the promise object
			});
		}
	}

});
