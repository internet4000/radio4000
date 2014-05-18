var XTrackComponent = Ember.Component.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		stopEditing: function(track) {
			this.set('isEditing', false);
		},
		deleteModel: function(track, playlist) {
			playlist = this.get('playlist');

			// Remove the track
			// track.destroyRecord();

			// And the relation in playlist.trackIsValid
			// NOT WORKING
			Promise.cast(playlist.get('tracks')).then(function(tracks) {
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();
			});
		},

		// doesnt work right now. think track.url is wrong
		trackIsValid: function() {
			var isValid = true;
			['track.url'].forEach(function(field) {
				if (this.get(field) === '') {
					isValid = false;
				}
			}, this);
			Ember.debug(isValid);
			return isValid;
		},

		saveModel: function(track, playlist) {
			// if (!this.trackIsValid()) {
			// 	Ember.debug('unvalid track');
			// 	return; }

			// Get the current model track
			track = this.get('track');
			playlist = this.get('playlist');

			// Close edit state
			this.set('isEditing', false);

			// Save the model
			track.save().then(function() {
				Ember.debug('Saved track');
			});
		}
	}
});

export default XTrackComponent;
