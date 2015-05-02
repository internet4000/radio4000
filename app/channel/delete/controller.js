import Ember from 'ember';

export default Ember.Controller.extend({

	actions: {
		deleteChannel() {
			const channel = this.get('model');

			this.deleteFavorites();
			this.deleteUserRelationship();

			// open public
			this.get('model.channelPublic').then((channelPublic) => {

				channelPublic.destroyRecord().then(() => {
					console.log('destroyed public');

					channel.destroyRecord().then(() => {
						Ember.debug('destroyed channel');
						this.transitionToRoute('channels.new');
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
			Ember.debug(channelPublic);

			// open followers
			channelPublic.get('followers').then((followers) => {
				Ember.debug(followers);

				// iterate
				followers.forEach(function(follower) {
					console.log('Found follower:');
					Ember.debug(follower.get('title'));

					// open
					follower.get('favoriteChannels').then((favs) => {
						Ember.debug(favs);
						Ember.debug(favs.contains(channel));
						favs.removeObject(channel);
						Ember.debug(favs.contains(channel));
						follower.save().then(() => {
							console.log('saved follower');
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
				Ember.debug('Removed channel on user');
			});
		});
	}
});
