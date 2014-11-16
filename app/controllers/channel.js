import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playback'],
	playback: Ember.computed.alias('controllers.playback'),
	isEditing: false,
	isEditingImage: false,

	// True if session user matches channel user
	canEdit: function() {
		return this.get('user.id') === this.get('session.user.id');
	}.property('user.id', 'session.user.id'),

	// Favorites (works but should be cleaned up)
	// TODO: emberfire comment with ObjectProxy
	isFavorite: false,
	isFavoriteTest: function() {
		if (!this.get('session.user')) { return false; }

		// TODO: this hack makes sure it runs at the right time, omg
		Ember.run.once(this, 'testFavorite');
	}.observes('model', 'session.user.favoriteChannels.[]'),

	testFavorite: function() {
		var _this = this;
		var model = this.get('model');
		var favorites = this.get('session.user.favoriteChannels');
		this.set('isFavorite', false);

		favorites.then(function() {
			favorites.forEach(function(item) {
				if (model === item) {
					_this.set('isFavorite', true);
				}
			});
		});
	},

	actions: {
		play: function() {
			// Either continues play or plays the newest e.g. last track
			if (this.get('playback.model')) {
				this.get('playback').send('play');
			} else {
				this.transitionToRoute('track', this.get('tracks.lastObject'));
			}
		},
		pause: function() {
			this.get('playback').send('pause');
		},

		// Edit image actions
		editImage: function() {
			this.toggleProperty('isEditingImage');
		},
		cancelEditImage: function() {
			this.send('editImage');
			this.get('model').rollback();
		},
		saveImage: function() {
			this.send('editImage');
			this.get('model').save();
		},

		toggleFavorite: function() {
			if (this.get('model.isSaving')) { return false; }

			var _this = this;
			var user = this.get('session.user');
			var model = this.get('model');

			user.get('favoriteChannels').then(function(favoriteChannels) {
				// either add or remove the favorite
				if (!this.get('isFavorite')) {
					Ember.debug('adding');
					favoriteChannels.addObject(model);
				} else {
					Ember.debug('removing');
					user.reload(); // hack! without this it won't remove the object
					favoriteChannels.removeObject(model);
				}

				user.save();
				this.toggleProperty('isFavorite');
			}.bind(this));
		}
	}
});
