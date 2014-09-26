import Ember from 'ember';

export default Ember.ObjectController.extend({

	isEditing: false,
	canEdit: function() {
		return this.get('model.user') === this.get('auth.user');
	}.property('model.user', 'auth.user'),

	isEditingSlug: false,

	userFavs: function() {
		return this.get('auth.user.favoritePlaylists');
	}.property('auth.user.favoritePlaylists.[]'),

	isFavorite: function() {
		// first check if we have the favorites and can continue
		var favorites = this.get('auth.user.favoritePlaylists');
		if (favorites === null) { return false; }
		// initially set it to false
		var model = this.get('model');
		var isFavorite = false;
		// iterate through each favorite and see if it matches the current model
		favorites.forEach(function(item){
			if (model === item) {
				isFavorite = true;
			}
		});

		return isFavorite;
	}.property('auth.user.favoritePlaylists.[]'),

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		// truncateText: function(string, length) {
		// 	if (string.length > length) {
		// 		return string.substring(0, length - 3) + '...';
		// 	} else {
		// 		return string;
		// 	}
		// },

		editSlug: function(status) {
			this.set('isEditingSlug', true);
		},
		cancel: function() {
			this.set('isEditing', false);
			this.set('isEditingSlug', false);
		},
		save: function() {
			var playlist = this.get('model');

			//@todo make sure slug is clean
			var cleanSlug = this.get('slug').dasherize();
			this.set('slug', cleanSlug);

			// Save, transition to new url and close (cancel) the edit mode
			playlist.save().then(function(){
				Ember.debug('Saved playlist');
				this.transitionToRoute('playlist', this.get('slug'));
			}.bind(this));
			this.send('cancel');
		},
		tryDelete: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');
			var confirmed = confirm('Are you sure?');

			if (confirmed) {
				// remove the playlist on the user
				// @todo it should remove it on every user…
				Ember.RSVP.Promise.cast(user.get('playlists')).then(function(playlists) {
					playlists.removeObject(playlist);
					user.save().then(function() {
						Ember.debug('Success: playlist removed from user');
					});
				});
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

			// Save the current model playlist on the user as a favorite
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
