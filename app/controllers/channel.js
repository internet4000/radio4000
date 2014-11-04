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
		var _this = this;
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
					_this.set('isFavorite', true);
				} else {
					// Ember.debug('no match');
				}
			});
		});
	},

	actions: {
		playLatest: function() {
			this.transitionToRoute('track', this.get('tracks.lastObject'));
		},
		stopEditing: function() {
			this.transitionToRoute('channel', this.get('model'));
		},
		save: function() {
			// transition to current slug (needed if it changed)
			this.transitionToRoute('channel', this.get('slug'));
			this.get('model').save().then(function() {
				Ember.debug('Saved channel');
			}.bind(this));
		},
		deletePlaylist: function() {
			var _this = this;
			var user = this.get('session.user');
			var model = this.get('model');

			// remove channel from session user
			user.get('channels').removeObject(model);
			user.get('favoriteChannels').removeObject(model);
			user.save().then(function(){
				// delete the channel it_this
				model.destroyRecord();
				Ember.debug('Playlist deleted');
			});

			// 1. find users that have the channel as favorite
			// 2. remove it
			this.store.find('user').then(function(users) {
				users.forEach(function(user) {
					user.get('favoriteChannels').then(function(favoritePlaylist) {
						favoritePlaylist.removeObject(model);
						user.save();
						_this.transitionToRoute('/');
					});
				});
			});
		},
		toggleFavorite: function() {
			if (this.get('model.isSaving')) { return false; }

			var _this = this;
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
