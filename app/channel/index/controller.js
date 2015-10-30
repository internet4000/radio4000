import Ember from 'ember';

const {computed, debug, inject} = Ember;

export default Ember.Controller.extend({
	// player: Ember.inject.service(), // used for debugging unplayed + history
	// queryParams: ['tags'],
	isAdding: false,
	isEditing: false,

	// needed to access canEdit
	channelController: inject.controller('channel'),
	canEdit: computed.alias('channelController.canEdit'),
	hasFewTracks: computed.lte('tracks.length', 2),

	actions: {
		transitionToTrack(track) {
			this.transitionToRoute('track', track);
		},
		closeModals() {
			this.setProperties({
				isEditing: false,
				isAdding: false,
				trackToEdit: null
			});
		},
		addTrack() {
			this.set('isAdding', true);

			// let url = this.get('addTrackUrl');
			// this.transitionToRoute('channel.add', {
			// 	queryParams: { url: url }
			// });
		},
		startEditing(track) {
			this.set('trackToEdit', track);
			this.set('isEditing', true);
		},
		saveNewTrack(track) {
			this.set('addTrackUrl', null);

			debug('save new track');

			// leave it to the parent route to create the new track
			return true;
		},

		updateTrack(track) {
			this.send('closeModals');

			if (!track) {
				Ember.warn('updateTrack was called without a track');
				return;
			}

			debug('Updating track from controller.');

			// in case url changed, we need to set the ytid
			track.updateProvider();

			// Save and add it to the tracks relationship on the channel
			track.save().then(() => {
				debug('updated track');
			}, () => {
				debug('could not update track');
			});
		},
		deleteTrack() {
			this.send('closeModals');
			return true;
		}
	}
});
