import Ember from 'ember';

const {debug, computed} = Ember;

export default Ember.Controller.extend({
	player: Ember.inject.service(),

	// @todo: this is very slow!!
	// lastUpdatedFormatted: computed('model.tracks.@each.created', function () {
	// 	const date = this.get('model.tracks.lastObject.created');

	// 	// only the channel owner can see the exact time (privacy)
	// 	if (this.get('canEdit')) {
	// 		return window.moment(date).fromNow();
	// 	}
	// 	return window.moment(date).subtract(1, 'days').fromNow();
	// }),

	// canEdit: computed('model', 'session.currentUser.channels.firstObject', function () {
	// 	const channel = this.get('model');
	// 	const userChannel = this.get('session.currentUser.channels.firstObject');

	// 	// debug(channel);
	// 	// debug(userChannel);

	// 	// first avoid both props being null === null which equals true (lol)
	// 	if (channel === null || userChannel === null || userChannel === undefined) {
	// 		return false;
	// 	}

	// 	// then check
	// 	const canEdit = (channel.get('id') === userChannel.get('id'));
	// 	// debug('checking canEdit');
	// 	// debug(canEdit);

	// 	return canEdit;
	// }),

	// isWelcomed: computed('model.tracks.firstObject', 'model.images.firstObject', 'model.favoriteChannels.firstObject', 'canEdit', function () {
	// 	let canEdit = this.get('canEdit');
	// 	let hasTrack = this.get('model.tracks.firstObject');
	// 	let hasImage = this.get('model.images.firstObject');
	// 	let hasFavorite = this.get('model.favoriteChannels.firstObject');
	// 	if (canEdit && hasTrack && hasImage && hasFavorite) {
	// 		return true;
	// 	}
	// 	return false;
	// }),

	isFavorite: computed('model', 'session.currentUser.channels.firstObject.favoriteChannels.[]', function () {
		const channel = this.get('model');
		const favorites = this.get('session.currentUser.channels.firstObject.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!favorites) {
			return false;
		}

		// true if this channel is a favorite of the user's favorites
		return favorites.contains(channel);
	}),

	actions: {
		toggleFavorite() {
			const userChannel = this.get('session.currentUser.channels.firstObject');

			if (!userChannel) {
				debug('no user channel - transitioning to sigin');
				this.transitionToRoute('login');
				return;
			}

			const channel = this.get('model');
			const channelPublic = channel.get('channelPublic');
			const channelFollowers = channelPublic.get('followers');
			const isFavorite = this.get('isFavorite');
			const userFavorites = userChannel.get('favoriteChannels');

			userFavorites.then(userfavs => {
				debug(userfavs);

				// add or remove to user's channel's favorites
				if (isFavorite) {
					debug('removing this channel from user favorites');
					userfavs.removeObject(channel);
				} else {
					debug('adding this channel from user favorites');
					userfavs.addObject(channel);
				}

				// save the parent
				userChannel.save();
			});

			channelFollowers.then(followers => {
				// toggle the userChannel from this channel's public followers
				if (isFavorite) {
					debug('removing user channel from channel followers');
					followers.removeObject(userChannel);
				} else {
					debug('adding user channel from channel followers');
					followers.addObject(userChannel);
				}

				// open and save the parent
				channelPublic.then(cp => {
					cp.save().then(() => {
						debug('saved channel public');
					});
				});
			});
		}
	}
});
