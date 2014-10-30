import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isEditing:is-editing'],

	// close 'add track' on esc key
	keyDown: function(event) {
		if (event.keyCode === 27) {
			// @todo call the cancel action here instead
			this.set('currentTrackComponent', null);
		}
	},

	currentTrackComponent: null,
	isEditing: function(){
		return this.get('currentTrackComponent') === this.get('elementId');
	}.property('currentTrackComponent'),

	actions: {
		edit: function() {
			this.set('currentTrackComponent', this.get('elementId'));
		},
		cancel: function() {
			this.set('currentTrackComponent', null);
		},
		save: function(track) {
			this.send('cancel');
			this.get('track').save().then(function() {
				Ember.debug('Saved track');
			});
		},
		remove: function(track) {
			Ember.debug('deleting');

			// Delete the track object and the corresponding track object in channel.tracks
			var channel = this.get('channel.model');
			channel.get('tracks').then(function(tracks) {
				Ember.debug(tracks);
				tracks.removeObject(track);
				track.destroyRecord();
				channel.save();
				Ember.debug('Deleted the track');
			});
		}
	}
});
