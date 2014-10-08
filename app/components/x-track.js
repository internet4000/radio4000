import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isEditing:is-editing'],
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		// Delete the track object and the corresponding track object in playlist.tracks
		remove: function(track) {
			Ember.debug('deleting');

			var playlist = this.get('playlist.model');
			playlist.get('tracks').then(function(tracks) {
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();

				Ember.debug('Deleted the track');
			});
		},

		save: function(track) {
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
