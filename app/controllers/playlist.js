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

	cleanSlug: function(slug) {
		var cleanSlug = this.get('slug').dasherize();
		this.set('slug', cleanSlug);
	},

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		editSlug: function(status) {
			this.set('isEditingSlug', true);
		},
		cancel: function() {
			this.set('isEditing', false);
			this.set('isEditingSlug', false);
		},
		save: function() {
			var playlist = this.get('model');

			// Make sure slug is clean
			this.cleanSlug();

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
		// Save the current model playlist on the user as a favorite
		favorite: function() {
			this.get('userFavs').addObject(this.get('model'));
			this.send('saveUser');
		},
		removeFavorite: function() {
			this.get('userFavs').removeObject(this.get('model'));
			this.send('saveUser');
		},
		saveUser: function() {
			var user = this.get('auth.user');
			user.save().then(function() {
				Ember.debug('user saved');
			}, function() {
				Ember.warn('could not save user');
			});
		}
	}
});
