import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['tracks'],

	isEditing: false,
	canEdit: function() {
		return this.get('user.id') === this.get('session.user.id');
	}.property('user.id', 'session.user.id'),

	// Favorites
	// because it's a hasMany relationship, this needs a bit of extra work to really work
	isFavorite: false,
	isFavoriteTest: function() {
		// only run if you are logged in
		if (!this.get('session.user')) { return false; }
		// make sure it runs
		Ember.run.once(this, 'testFavorite');
	}.observes('model', 'session.user.favoritePlaylists.[]'),
	testFavorite: function() {
		// Ember.debug('test fav');
		var self = this;
		var playlist = this.get('model');
		var favorites = this.get('session.user.favoritePlaylists');
		this.set('isFavorite', false);
		favorites.then(function() {
			favorites.forEach(function(item) {
				// Ember.debug('comparing this');
				// Ember.debug(playlist);
				// Ember.debug('with this');
				// Ember.debug(item);
				if (playlist === item) {
					// Ember.debug('match');
					self.set('isFavorite', true);
				} else {
					// Ember.debug('no match');
				}
			});
		});
	},

	actions: {
		claim: function() {
			var user = this.get('session.user');
			var playlist = this.get('model');

			user.get('playlists').then(function(playlists) {
				playlists.addObject(playlist);
				user.save().then(function() {
					Ember.debug('Success: playlist removed from user');
				});
			}.bind(this));

			playlist.set('user', user);
			playlist.save().then(function() {
				Ember.debug('Success: playlist removed from user');
			});
		},
		playLatest: function() {
			this.transitionToRoute('track', this.get('tracks.lastObject'));
		},
		stopEditing: function() {
			this.transitionTo('playlist', this.get('model'));
		},
		save: function() {
			this.get('model').save().then(function(){
				this.transitionToRoute('playlist', this.get('slug'));
			}.bind(this));
		},
		deletePlaylist: function() {
			// var user = this.get('session.user');
			var playlist = this.get('model');

			// get all users
			this.store.find('user').then(function(users) {
				users.forEach(function(user) {
					Ember.debug(user);
					user.get('favoritePlaylists').then(function(favoritePlaylist) {
						favoritePlaylist.removeObject(playlist);
						user.save().then(function() {
							Ember.debug('Success: playlist removed from user');
						});
					});
				});

				// delete the playlist itself
				playlist.destroyRecord();
				this.transitionToRoute('application');
				Ember.debug('Playlist deleted');
			}.bind(this));

			// @todo remove it in all users favoritePlaylists relationships
		},
		toggleFavorite: function() {
			if (this.get('model.isSaving')) { return false; }

			var self = this;

			var user = this.get('session.user');
			var playlist = this.get('model');


			user.get('favoritePlaylists').then(function(favorites) {
				// either add or remove the favorite
				if (!this.get('isFavorite')) {
					Ember.debug('adding');
					favorites.addObject(playlist);
				} else {
					Ember.debug('removing');
					user.reload(); // hack! without this it won't remove the object
					favorites.removeObject(playlist);
				}

				user.save();
				this.toggleProperty('isFavorite');
			}.bind(this));
		}
	}
});
