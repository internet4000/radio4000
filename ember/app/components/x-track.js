var XTrackComponent = Ember.Component.extend({
	// tagName: 'li',
	classNames: ['Track'],
	classNameBindings: ['isEditing:is-editing'],
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		stopEditing: function(track) {
			this.set('isEditing', false);
		},
		// Delete the track object and the corresponding track object in playlist.tracks
		deleteTrack: function(track) {
			Ember.debug('deleting');

			var playlist = this.get('playlist');

			Promise.cast(playlist.get('tracks')).then(function(whatver) {
				whatver.removeObject(track);
				track.destroyRecord();
				playlist.save();
				Ember.debug('Deleted.');
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

		saveTrack: function(track, playlist) {
			// if (!this.trackIsValid()) {
			// 	Ember.debug('unvalid track');
			// 	return; }

			// Get the current model track
			track = this.get('track');

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
