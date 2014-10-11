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
				Ember.debug(tracks);
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();
				Ember.debug('Deleted the track');
			});
		},

		save: function(track) {
			// Close edit state
			this.set('isEditing', false);

			// Save the model
			this.get('track').save().then(function() {
				Ember.debug('Saved track');
			});
		}
	}
});
