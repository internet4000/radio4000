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
		return this.get('model') === this.get('session.userChannel');
	}.property('model', 'session.userChannel'),

	actions: {
		play: function() {
			// Either continues play or plays the newest e.g. last track
			if (this.get('playback.model')) {
				this.get('playback.player').send('play');
			} else {
				this.transitionToRoute('track', this.get('tracks.lastObject'));
			}
		},
		pause: function() {
			this.get('playback.player').send('pause');
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
			this.set('isEditingImage', false);

			// stop if the user didn't upload a new photo
			if (!newImage) { return; }

			// if we have no previous image
			if (!coverImage) {

				// create one
				var image = this.store.createRecord('image', {
					src: this.get('newImage'),
					channel: this.get('model')
				}).save().then(function(image) {

					// and add it to the channel
					channel.get('images').addObject(image);
					channel.save();
				});
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
			var channel = this.get('model');
			var sessionUserFavorites = this.get('session.userChannel.favoriteChannels');
			var isFavorite = this.get('isFavorite');

			Ember.debug(isFavorite);
			Ember.debug(channel.get('title'));
			Ember.debug(this.get('session.userChannel.title'));

			if (isFavorite) {
				sessionUserFavorites.removeObject(channel);
			} else {
				sessionUserFavorites.addObject(channel);
			}
		}
	},

	// Favorites
	isFavorite: function() {
		var channel = this.get('model');
		var sessionUserFavorites = this.get('session.userChannel.favoriteChannels');

		// todo: change the computed property so we don't need this check
		if (!sessionUserFavorites) { return; }

		return sessionUserFavorites.contains(channel);

	}.property('session.userChannel.favoriteChannels.[]'),
});
