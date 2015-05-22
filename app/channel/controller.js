import Ember from 'ember';

const { debug, computed } = Ember;

export default Ember.Controller.extend({
	player: Ember.inject.service(),

	// lastUpdatedFormatted: computed('model.tracks.@each.created', function() {
	// 	const date = this.get('model.tracks.lastObject.created');

	// 	// only the channel owner can see the exact time (privacy)
	// 	if (this.get('canEdit')) {
	// 		return window.moment(date).fromNow();
	// 	} else {
	// 		return window.moment(date).subtract(1, 'days').fromNow();
	// 	}
	// }),

	canEdit: computed('model', 'session.currentUser.channels.firstObject', function() {
		const channel = this.get('model');
		const userChannel = this.get('session.currentUser.channels.firstObject');

		// debug(channel);
		// debug(userChannel);

		// first avoid both props being null === null which equals true (lol)
		if (channel === null || userChannel === null || userChannel === undefined) {
			debug('something is null');
			return false;
		}

		// then check
		const canEdit = (channel.get('id') === userChannel.get('id'));
		// debug('checking canEdit');
		// debug(canEdit);

		return canEdit;
	}),

	isFavorite: computed('model', 'session.currentUser.channels.firstObject.favoriteChannels.@each', function() {
		const channel = this.get('model');
		const favorites = this.get('session.currentUser.channels.firstObject.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!favorites) { return false;}

		// true if this channel is a favorite of the user's favorites
		return favorites.contains(channel);
	}),

	actions: {
		play() {
			debug('transitioning to newest track');
			this.transitionToRoute('track', this.get('model.tracks.lastObject'));
		},

		pause() {
			this.get('player').pause();
		},

		toggleFavorite() {
			const userChannel = this.get('session.currentUser.channels.firstObject');

			if (!userChannel) {
				debug('no user channel - transitioning to sigin');
				this.transitionToRoute('login');
				return false;
			}

			const channel = this.get('model');
			const channelPublic = channel.get('channelPublic');
			const channelFollowers = channelPublic.get('followers');
			const isFavorite = this.get('isFavorite');
			const favorites = userChannel.get('favoriteChannels');

			favorites.then((favs) => {

				debug(favs);

				// add or remove to user's channel's favorites
				if (isFavorite) {
					favs.removeObject(channel);
				} else {
					favs.addObject(channel);
				}

				// save the parent
				userChannel.save();
			});

			channelFollowers.then((followers) => {

				// toggle the userChannel from this channel's public followers
				if (isFavorite) {
					followers.removeObject(userChannel);
				} else {
					followers.addObject(userChannel);
				}

				// open and save the parent
				channelPublic.then(function(cp) {
					cp.save();
				});
			});
		}
	}
});
