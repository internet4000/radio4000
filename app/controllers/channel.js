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
	}.observes('model', 'session.user.favoriteChannels.[]'),
	testFavorite: function() {
		// Ember.debug('test fav');
		var self = this;
		var model = this.get('model');
		var favorites = this.get('session.user.favoriteChannels');
		this.set('isFavorite', false);
		favorites.then(function() {
			favorites.forEach(function(item) {
				// Ember.debug('comparing this');
				// Ember.debug(model);
				// Ember.debug('with this');
				// Ember.debug(item);
				if (model === item) {
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
			var model = this.get('model');

			user.get('channels').then(function(channels) {
				channels.addObject(model);
				user.save().then(function() {
					Ember.debug('Success: channel removed from user');
				});
			}.bind(this));

			model.set('user', user);
			model.save().then(function() {
				Ember.debug('Success: channel removed from user');
			});
		},
		playLatest: function() {
			this.transitionToRoute('track', this.get('tracks.lastObject'));
		},
		stopEditing: function() {
			this.transitionToRoute('channel', this.get('model'));
		},
		save: function() {
			this.transitionToRoute('channel', this.get('slug'));
			this.get('model').save().then(function() {
				Ember.debug('Saved channel');
			}.bind(this));
		},
		deletePlaylist: function() {
			// var user = this.get('session.user');
			var model = this.get('model');

			// get all users
			this.store.find('user').then(function(users) {

				// @todo there must be a better way to do this
				users.forEach(function(user) {
					Ember.debug(user);
					user.get('favoriteChannels').then(function(favoritePlaylist) {
						favoritePlaylist.removeObject(model);
						user.save().then(function() {
							Ember.debug('Success: channel removed from user');
						});
					});
				});

				// delete the channel itself
				model.destroyRecord().then(function() {
					Ember.debug('Playlist deleted');
					this.transitionToRoute('application');
				}.bind(this));

			}.bind(this));

			// @todo remove it in all users favoriteChannels relationships
		},
		toggleFavorite: function() {
			if (this.get('model.isSaving')) { return false; }

			var self = this;
			var user = this.get('session.user');
			var model = this.get('model');

			user.get('favoriteChannels').then(function(favorites) {
				// either add or remove the favorite
				if (!this.get('isFavorite')) {
					Ember.debug('adding');
					favorites.addObject(model);
				} else {
					Ember.debug('removing');
					user.reload(); // hack! without this it won't remove the object
					favorites.removeObject(model);
				}

				user.save();
				this.toggleProperty('isFavorite');
			}.bind(this));
		}
	}
});
