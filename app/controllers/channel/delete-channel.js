import Ember from 'ember';
import clean from 'radio4000/utils/clean';

export default Ember.Controller.extend({

	actions: {

		// Deletes the channel (definitive)
		deleteChannel() {

			/* Expected behavior
			1- remove reference of privateChannel in user
			   * this will never be automatic because we don't want any reference of the channelPrivate (or public)
			   on the user, since we want the user to be annonymous (no relationship defined)
			2- remove references of privateChannel:
				2a- in all users.privateChannel.favoriteChannels
				2b- in all users.publicChannel.followers
			3- delete publicChannel
			4- delete privateChannel
			*/

			var user = this.get('session.user');
			var channel = this.get('model');

			user.get('channels').then(function(userChannels) {
				console.log('// 1- remove privateChannel reference on user');
				// 1- remove privateChannel reference on user
				// userChannels.removeObject(channel);
				// user.save().then(function() {
				// 	Ember.debug("privateChannel reference on user was removed");
				// });
			}).then(function() {
				console.log("// 2a- remove privateChannel reference other privateChannel.favoriteChannels");
				// 2a- remove privateChannel reference on other privateChannel.favoriteChannels
				// channel.get('channelPublic.followers').then(function(favorites) {
				// 	// get all this channel's favorite channels and for each...
				// 	favorites.forEach(function(fav) {
				// 		// remove reference of the privateChannel that is being deleted
				// 		fav.get('favoriteChannels').then(function(following) {
				// 			following.removeObject(channel);
				// 			fav.save().then(function() {
				// 				Ember.debug("channel reference on follower was removed");
				// 			});
				// 		});
				// 	});
				// });
			}).then(function() {
				console.log("// 2b- remove reference privateChannel in all users.publicChannel.followers");
				// 2b- remove reference privateChannel in all users.publicChannel.followers
				channel.get('favoriteChannels').then(function(favorites) {
					// get all this channel's favorite channels and for each...
					favorites.forEach(function(fav) {
						// navigate between models (promises)
						fav.get('channelPublic').then(function(publicChannel){
							// remove reference of the privateChannel that is being deleted
							publicChannel.get('followers').then(function(followers) {
								console.log(followers);
								followers.removeObject(channel);
								fav.save().then(function() {
									Ember.debug("channel reference as itself a follower was removed");
								});
							});
						});
					});
				});
			}).then(function() {
				console.log("// 3- delete publicChannel");
				// 3- delete publicChannel
				// channel.get('channelPublic').then(function(publicChannel){
				// 	publicChannel.destroyRecord();
				// 	Ember.debug("publicChannel was deleted");
				// });
			}).then(function() {
				console.log("// 4- delete privateChannel");
				// 4- delete privateChannel
				// channel.destroyRecord().then(function() {
				// 	Ember.debug("privateChannel was deleted");
				// });
			}).then(function() {
  				console.log("all channel references and model are now deleted");
			});








			// notify our sesion because it's a shortcut
			// @todo with some refactor this shouldn't be necessary
			// this.set('session.userChannel', null);

			// this.transitionToRoute('channels.new');
			// remove it as favorite on all channels
			// channels.then(function(channels) {
			// 	Ember.debug(channels);
			// 	channels.forEach(function(channel) {
			// 		channel.get('favoriteChannels').then(function(favorites) {
			// 			favorites.removeObject(channel);
			// 			if (favorites.get('isDirty')) {
			// 				Ember.debug('is dirty');
			// 				promises.push(favorites.save());
			// 			}
			// 		});
			// 	});
			// }, function() {
			// 	//developer failed to save;
			// 	Ember.warn('Error - could not get channels');
			// });

			// // All favorites have been removed
			// Ember.RSVP.all(promises).then(function() {
			// 	_this.transitionToRoute('channels.new');
			// }, function() {
			// 	Ember.warn('Error - could not resolve all promises');
			// 	//one or more languages failed to save
			// });

		}
	}
});
