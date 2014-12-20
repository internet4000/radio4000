import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playback'],
	playback: Ember.computed.alias('controllers.playback'),
	isEditing: false,
	isEditingImage: false,

	// Set the last image as the cover image
	coverImage: function() {
		return this.get('images.lastObject');
	}.property('images.@each'),

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
			var channel = this.get('model');
			var coverImage = this.get('coverImage');
			var newImage = this.get('newImage');

			// close dialog
			this.send('editImage');

			// stop if the user didn't upload a new photo
			if (!newImage) { return; }

			// if we have no previous image
			if (!coverImage) {

				// create one
				var image = this.store.createRecord('image', {
					src: this.get('newImage')
				}).save();

				// and add it to the channel
				channel.get('images').addObject(image);
				channel.save();
			}

			// if we already have an image
			if (coverImage) {
				// and it's not the same one
				if (coverImage.get('src') === newImage) { return; }

				// update it
				coverImage.set('src', this.get('newImage'));
				coverImage.save();
			}

		},

		toggleFavorite: function() {
			if (this.get('model.isSaving')) { return false; }

			var _this = this;
			var user = this.get('session.user');
			var model = this.get('model');

			user.get('favoriteChannels').then(function(favoriteChannels) {
				// either add or remove the favorite
				if (!this.get('isFavorite')) {
					favoriteChannels.addObject(model);
				} else {
					user.reload(); // hack! without this it won't remove the object
					favoriteChannels.removeObject(model);
				}

				user.save();
				this.toggleProperty('isFavorite');
			}.bind(this));
		}
	}
});
