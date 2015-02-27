import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['playback'],
	playback: Ember.computed.alias('controllers.playback'),
	isEditing: false,
	isEditingImage: false,

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
				});

				// save and add it to the channel
				image.save().then(function(image) {
					channel.get('images').addObject(image);
					// and save that
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
			var userChannel = this.get('session.userChannel');
			var userFavorites = userChannel.get('favoriteChannels');
			var channel = this.get('model');
			var channelFollowers = channel.get('followers');
			var isFavorite = this.get('isFavorite');

			if (isFavorite) {
				userFavorites.removeObject(channel);
				channelFollowers.removeObject(userChannel);
			} else {
				userFavorites.addObject(channel);
				channelFollowers.addObject(userChannel);
			}

			userChannel.save();
			channel.save();
		}
	},

	// If the current user's favoriteChannels contains this channel
	// it's a favorite…
	isFavorite: function() {
		var channel = this.get('model');
		var userFavorites = this.get('session.userChannel.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!userFavorites) { return false; }

		return userFavorites.contains(channel);
	}.property('session.userChannel.favoriteChannels.@each'),

});
