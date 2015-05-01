import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isEditing', 'isCurrent'],

	// keeping track of editing in a list, so only one track is edited at a time
	currentTrackComponent: null,

	// close 'add track' on esc key
	keyDown(event) {
		if (event.keyCode === 27) {
			this.send('cancelEdit');
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

		cancelEdit() {
			this.set('currentTrackComponent', null);
		},

		saveTrack() {
			const track = this.get('track');

			// todo: this shouldn't be necessary
			track.updateProvider();

			this.send('cancelEdit');
			track.save().then(() => {
				Ember.debug('Saved track');
			});
		},

		deleteTrack() {
			let track = this.get('track');
			// let channel = this.get('track.channel');

			track.get('channel').then((channel) => {
				// channel.save();
				// // first remove from parent
				channel.get('tracks').then((tracks) => {
					tracks.removeObject(track);
					channel.save();

					this.send('cancelEdit');

					// then itself
					track.destroyRecord();
				});
			});
		}
	}
});
