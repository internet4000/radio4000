import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isEditing:is-editing'],


	currentTrackComponent: null,
	isEditing: function(){
		return this.get('currentTrackComponent') === this.get('elementId');
	}.property('currentTrackComponent'),

	actions: {
		edit: function() {
			var current = null;
			if (!this.get('isEditing')) {
				current = this.get('elementId');
			}
			this.set('currentTrackComponent', current);
		},
		cancel: function() {
			this.set('isEditing', false);
		},
		save: function(track) {
			this.send('cancel');
			this.get('track').save().then(function() {
				Ember.debug('Saved track');
			});
		},
		remove: function(track) {
			Ember.debug('deleting');

			// Delete the track object and the corresponding track object in playlist.tracks
			var playlist = this.get('playlist.model');
			playlist.get('tracks').then(function(tracks) {
				Ember.debug(tracks);
				tracks.removeObject(track);
				track.destroyRecord();
				playlist.save();
				Ember.debug('Deleted the track');
			});
		}
	}
});
