import Ember from 'ember';

const {Controller, debug, get, set} = Ember;

export default Controller.extend({

	// so user does not click two times
	isDeleting: false,

	actions: {
		deleteChannel() {
			const messages = get(this, 'flashMessages');
			const channel = get(this, 'model');
			const channelPublic = get(this, 'model.channelPublic');

			set(this, 'isDeleting', true);

			// open public
			channelPublic.then(channelPublic => {
				// start deleting favorites in parallel
				this.deleteFavoritesFrom(channel);

				channelPublic.destroyRecord().then(() => {
					debug('destroyed public');

					channel.destroyRecord().then(() => {
						debug('destroyed channel, transitioning to chanels');

						// this needs to happen after deleting the channel
						// because of our firebase rules which use the user relationship
						this.deleteUserRelationshipFrom(channel);
						set(this, 'isDeleting', false);
						messages.success('Radio channel deleted. Farewell!', {timeout: 10000});
						this.transitionToRoute('channels');
					});
				});
			});
		}
	},

	// Deletes all references of this channel on its followers' favorite channels
	deleteFavoritesFrom(channel) {
		channel.get('channelPublic').get('followers').then(followers => {
			followers.forEach(follower => {
				debug(`Found follower: ${follower.get('title')}`);

				follower.get('favoriteChannels').then(favoriteChannels => {
					favoriteChannels.removeObject(channel);
					follower.save().then(() => {
						debug('Removed this channel as favorite on a follower');
					});
				});
			});
		});
	},

	// Delete this channel on the session user
	deleteUserRelationshipFrom(channel) {
		const user = get(this, 'session.currentUser');
		user.get('channels').then(userChannels => {
			userChannels.removeObject(channel);
			user.save().then(() => {
				debug('Removed channel on user');
			});
		});
	}
});
