import Ember from 'ember';

export default Ember.Component.extend({
	// tagName: 'li',
	classNames: ['Track'],
	classNameBindings: ['isEditing:is-editing'],
	isEditing: false,

	canEdit: function() {
		return this.get('auth.user.playlists') === this.get('playlist');
	}.property('playlist', 'auth'),

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		cancel: function(track) {
			this.set('isEditing', false);
		},
		// Delete the track object and the corresponding track object in playlist.tracks
		remove: function(track) {
			Ember.debug('deleting');

			var playlist = this.get('playlist');
			playlist.get('tracks').then(function(tracks) {
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();

				Ember.debug('Deleted the track');
			});
		},

		save: function(track, playlist) {
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
