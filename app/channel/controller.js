import Ember from 'ember';

const {debug, computed, inject} = Ember;

export default Ember.Controller.extend({
	player: inject.service(),

	backgroundColorStyle: computed('model.backgroundColor', function () {
		return new Ember.Handlebars.SafeString(`background-color: ${this.get('model.backgroundColor')}`);
	}),

	canEdit: computed('model', 'session.currentUser.channels.firstObject', {
		get() {
			const channel = this.get('model');
			const userChannel = this.get('session.currentUser.channels.firstObject');
			// Avoid any property being null because `(null === null)` equals true…
			if (channel === null || userChannel === null || userChannel === undefined) {
				return false;
			}
			return channel.get('id') === userChannel.get('id');
		},
		set() {
			// not allowed
		}
	}),

	isWelcomed: computed('model.tracks.firstObject', 'model.images.firstObject', 'model.favoriteChannels.firstObject', 'canEdit', function () {
		const canEdit = this.get('canEdit');
		// No need to check for more if you can't edit.
		if (!canEdit) {
			return false;
		}
		const hasTrack = this.get('model.tracks.firstObject');
		const hasImage = this.get('model.images.firstObject');
		const hasFavorite = this.get('model.favoriteChannels.firstObject');
		return canEdit && hasTrack && hasImage && hasFavorite;
	}),

	isFavorite: computed('model', 'session.currentUser.channels.firstObject.favoriteChannels.[]', function () {
		const channel = this.get('model');
		const favorites = this.get('session.currentUser.channels.firstObject.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!favorites) {
			return false;
		}

		// true if this channel is a favorite of the user's favorites
		return favorites.includes(channel);
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
