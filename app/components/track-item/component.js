import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isEditing', 'isCurrent'],

	// keeping track of editing in a list, so only one track is edited at a time
	currentTrackComponent: null,

	// close 'add track' on esc key
	keyDown(event) {
		if (event.keyCode === 27) {
			// @todo call the cancel action here instead
			this.set('currentTrackComponent', null);
		}
	},

	isCurrent: Ember.computed('playback.model', 'track', function() {
		return this.get('playback.model') === this.get('track');
	}),

	isEditing: Ember.computed('currentTrackComponent', 'elementId', function() {
		return this.get('currentTrackComponent') === this.get('elementId');
	}),

	actions: {
		edit() {
			this.set('currentTrackComponent', this.get('elementId'));
		},

		cancel() {
			this.set('currentTrackComponent', null);
		},

		save() {
			var track = this.get('track');
			track.updateProvider();
			this.send('cancel');

			track.save().then(function() {
				Ember.debug('Saved track');
			});
		},

		// Delete the track object and the corresponding track object in channel.tracks
		deleteTrack() {
			var channel = this.get('track.channel');
			var channelTracks = channel.get('tracks');
			var track = this.get('track');

			Ember.debug('Deleting track');

			channelTracks.then((tracks) => {
				tracks.removeObject(track);
				channel.save();

				track.destroyRecord();
			});
		}
	}
});
