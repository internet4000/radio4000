import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: false,

	canEdit: function() {
		return this.get('model.user') === this.get('auth.user');
	}.property('model.user', 'auth.user'),

	// isFavorite: function() {
		// var userFavs = this.get('auth.user.favoritePlaylists');
		// @todo if model is in userfavs, it's a favorite
	// }.property('model.user', 'auth.user'),

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		save: function() {
			var playlist = this.get('model');
			playlist.save().then(function(){
				Ember.debug('Saved playlist');
			});
			this.send('cancel');
		},
		tryDelete: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');
			var confirmed = confirm('Are you sure?');

			if (confirmed) {

				// remove the playlist on the user
				Ember.RSVP.Promise.cast(user.get('playlists')).then(function(playlists) {
					playlists.removeObject(playlist);
					user.save().then(function() {
						Ember.debug('Success: playlist removed from user');
					});
				});

				// @todo
				// remove the playlist as favorite
				// Ember.RSVP.Promise.cast(user.get('favoritePlaylists')).then(function(favs) {
				// 	favs.removeObject(playlist);
				// 	user.save().then(function() {
				// 		Ember.debug('Success: playlist removed from user');
				// 	});
				// });

				// delete the playlist itself
				playlist.destroyRecord();
				Ember.debug('Playlist deleted');
				this.transitionToRoute('application');
			}
		},
		favorite: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');
			this.set('favorited', true);

			Ember.RSVP.Promise.cast(user.get('favoritePlaylists')).then(function(favorites) {
				favorites.addObject(playlist);
				user.save().then(function() {
					Ember.debug('Success: playlist saved as favorite on the user');
				});
			});
		},
		removeFavorite: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');
			this.set('favorited', false);

			Ember.RSVP.Promise.cast(user.get('favoritePlaylists')).then(function(favorites) {
				favorites.removeObject(playlist);
				user.save().then(function() {
					Ember.debug('Success: playlist removes from favorite on the user');
				});
			});
		}
	}
});
