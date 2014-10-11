import Ember from 'ember';

export default Ember.ObjectController.extend({

	firstRun: true,

	isEditing: false,
	canEdit: function() {
		return this.get('model.uid') === this.get('auth.authData.uid');
	}.property('model.uid', 'auth.user'),

	isEditingSlug: false,

	userFavorites: function() {
		return this.get('auth.user.favoritePlaylists');
	}.property('auth.user.favoritePlaylists.[]'),

	isFavorite: function() {
		Ember.debug('checking favorites');

		var isFavorite = false; // initially set it to false before the check
		var favorites = this.get('userFavorites');
		var playlist = this.get('model');
		var user = this.get('auth.user');
		var self = this;
		// check if the user is set
		if (!user) {
			Ember.debug('no user yet, waaaaait for it');
			return false;
		}

		// HACK!! otherwise it doesn't always load
		if (this.get('firstRun')) {
			Ember.debug('first');
			user.reload();
			this.set('firstRun', false);
		}

		Ember.debug('Continuing searching for favs, have the user now');
		favorites.then(function(favs) {
			favs.some(function(fav) {
				if (playlist === fav) {
					isFavorite = true;
					Ember.warn(isFavorite);
					self.set('isReallyFavorite', true);
					// console.log(fav.get('title') + ' YAY!');
				}
			});
		});
	}.property('model', 'userFavorites.[]', 'auth.user'),
	// }.property('model', 'auth.user.favoritePlaylists.@each'),

	validateSlug: function() {
		var canIHazSlug = true;
		var currentPlaylist = this.get('model');
		// dasherize turns spaces into dashes and makes it lowercase
		var newSlug = this.get('slug').dasherize();

		// make sure the new one isn't empty
		if (newSlug === '') {
			alert("Hey, the URL can't be empty. Please enter the URL you'd like your playlist to have. If you have no idea, just enter the title.");
			return false;
		}

		this.store.find('playlist').then(function(playlists) {
			playlists.forEach(function(playlist) {

				// If any other playlist has the same slug, abort!
				if (playlist !== currentPlaylist && playlist.get('slug') === newSlug) {
					alert('Sorry, that URL is already taken. Please choose another one.');
					canIHazSlug = false;
				}
			});

			if (canIHazSlug) {
				this.set('slug', newSlug);
				console.log('setting slug to' + newSlug);
				this.send('save');
			} else {
				console.log('reverting slug to' + this.get('savedSlug'));
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
			var confirmed = confirm('Are you sure? Your playlist will be gone forever. But you can always create a new one.');
			if (confirmed) {
				this.send('deletePlaylist');
			}
		},
		deletePlaylist: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');

			// also remove the playlist on the user
			// @todo it should remove it on every user…
			Ember.RSVP.Promise.cast(user.get('playlists')).then(function(playlists) {
				playlists.removeObject(playlist);
				// delete the playlist itself
				playlist.destroyRecord();
				this.transitionToRoute('application');
				Ember.debug('Playlist deleted');
				user.save().then(function() {
					Ember.debug('Success: playlist removed from user');
				});
			});
		},
		// Save the current model playlist on the user as a favorite
		favorite: function() {
			var favs = this.get('userFavorites').addObject(this.get('model'));
			this.get('auth.user').save().then(function() {
				this.set('isReallyFavorite', true);
			}.bind(this));
		},
		removeFavorite: function() {
			var user = this.get('auth.user');
			var playlist = this.get('model');
			var self = this;
			user.get('favoritePlaylists').then(function(favs) {
				// Ember.debug(favs);
				user.reload(); // hack! without this it won't remove the object
				favs.removeObject(playlist);
				user.save().then(function() {
					Ember.debug('saved');
					self.set('isReallyFavorite', false);
				});
			});
		}
	}
});
