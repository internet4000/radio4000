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

	isFavorite: Ember.computed('model', 'session.userChannel.favoriteChannels.@each', function() {
		var channel = this.get('model');
		var favorites = this.get('session.userChannel.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!favorites) { return false;}

		// true if this channel is a favorite of the user's favorites
		return favorites.contains(channel);
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
			var isFavorite = this.get('isFavorite');
			var channel = this.get('model');
			var followers = this.get('model.channelPublic.followers');
			var userChannel = this.get('session.userChannel');
			var userFavorites = userChannel.get('favoriteChannels');

			// toggle this channel from user's favorites
			userFavorites.then((uf) => {
				if (!isFavorite) {
					uf.addObject(channel);
				} else {
					uf.removeObject(channel);
				}

				uf.save().then(() => {
					Ember.debug('Updated userFavorites.');
				});
			});

			// toggle the userChannel from this channel's public followers
			followers.then((f) => {
				if (!isFavorite) {
					f.addObject(userChannel);
				} else {
					f.removeObject(userChannel);
				}

				f.save().then(() => {
					Ember.debug('Updated followers.');
				});
			});
		}
	}
});
