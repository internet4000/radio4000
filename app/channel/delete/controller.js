import Ember from 'ember';

const { debug } = Ember;

export default Ember.Controller.extend({

	// so user does not click two times
	isDeleting: false,

	actions: {
		deleteChannel() {
			this.set('isDeleting', true);
			const channel = this.get('model');

			this.deleteFavorites();
			this.deleteUserRelationship();

			// open public
			this.get('model.channelPublic').then((channelPublic) => {

				channelPublic.destroyRecord().then(() => {
					debug('destroyed public');

					channel.destroyRecord().then(() => {
						debug('destroyed channel, back to application.index');
						this.transitionToRoute('channels');
						// this.set('session.currentUser.channels.firstObject', null);
					});
				});
			});
		}
	},

	// Deletes all references of this channel on its followers' favorite channels
	deleteFavorites() {
		const channel = this.get('model');

		// open
		this.get('model.channelPublic').then((channelPublic) => {
			debug(channelPublic);

			// open followers
			channelPublic.get('followers').then((followers) => {
				debug(followers);

				// iterate
				followers.forEach(function(follower) {
					debug('Found follower:');
					debug(follower.get('title'));

					// open
					follower.get('favoriteChannels').then((favs) => {
						debug(favs);
						debug(favs.contains(channel));
						favs.removeObject(channel);
						debug(favs.contains(channel));
						follower.save().then(() => {
							debug('saved follower');
						});
					});
				});
			});
		});
	},

	// Delete this channel on the session user
	deleteUserRelationship() {
		const channel = this.get('model');
		const user = this.get('session.currentUser');

		user.get('channels').then((channels) => {
			channels.removeObject(channel);
			user.save().then(() => {
				debug('Removed channel on user');
			});
		});
	}
});
