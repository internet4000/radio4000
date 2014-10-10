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

	validateSlug: function() {
		var canIHazSlug = true;
		var currentPlaylist = this.get('model');
		// dasherize turns spaces into dashes and makes it lowercase
		var newSlug = this.get('slug').dasherize();

		this.store.find('playlist').then(function(playlists) {
			playlists.forEach(function(playlist) {

				// If any other playlist has the same slug, abort!
				if (playlist !== currentPlaylist && playlist.get('slug') === newSlug) {
					alert('Sorry, that URL is already taken. Please choose another one.');
					var canIHazSlug = false;
				}
			});

			if (canIHazSlug) {
				this.set('slug', newSlug);
				this.send('save');
			} else {
				this.set('slug', this.get('savedSlug')); // revert to old slug
			}

		}.bind(this));
	},

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		editSlug: function() {
			this.set('isEditingSlug', true);
			this.set('savedSlug', this.get('slug')); // save it for later
		},
		cancel: function() {
			this.set('isEditing', false);
			this.set('isEditingSlug', false);
		},
		trySave: function() {
			// Make sure slug is clean
			this.validateSlug();
		},

		// Save, transition to new url and close (cancel) the edit mode
		save: function() {
			this.get('model').save().then(function(){
				Ember.debug('Saved playlist');
				this.transitionToRoute('playlist', this.get('slug'));
			}.bind(this));
			this.send('cancel');
		},
		tryDelete: function() {
			var confirmed = confirm('Are you sure?');
			if (confirmed) {
				this.send('deletePlaylist');
			}
		},
		deletePlaylist: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');

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
