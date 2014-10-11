import Ember from 'ember';

export default Ember.ObjectController.extend({

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

		// initially set it to false
		var isFavorite = false;
		var playlist = this.get('model');

		// check if the user is set
		var user = this.get('auth.user');
		if (!user) {
			Ember.debug('no user yet, waaaaait for it');
			return false;
		}

		// compare each favorite with the current model
		Ember.debug('continuing searching for favs, have the user now');
		Ember.debug(this.get('userFavorites'));
		this.get('userFavorites').forEach(function(userFavorite) {
			if (playlist === userFavorite) {
				console.log(userFavorite.get('title') + ' YAY!');
				isFavorite = true;
			} else {
				console.log(userFavorite.get('title') + ' nop…');
			}
		});

		console.log(isFavorite);

		return isFavorite;
	}.property('userFavorites', 'auth.user'),

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
			var favs = this.get('userFavorites');

			Ember.debug(favs);
			favs.then(function(newFavs){
				Ember.debug(newFavs);
				Ember.debug(favs);
			});

			favs.addObject(this.get('model'));
			this.get('auth.user').save();
		},
		removeFavorite: function() {
			var favs = this.get('userFavorites');
			Ember.debug(favs);
			favs.removeObject(this.get('model'));
			this.get('auth.user').save();

			// // this.get('userFavorites').removeObject(this.get('model'));
			// // this.send('saveUser');

			// this.get('userFavorites').removeObject(this.get('model'));
			// user.save();
			// // favorites.save();
			// 	// // playlist.destroyRecord();
			// 	// user.save();
			// 	// playlist.save();
			// // });
		}
	}
});
