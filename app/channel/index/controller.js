import Ember from 'ember';

const { computed, debug, inject } = Ember;

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
		editTrack(track) {
			this.set('trackToEdit', track);
			this.set('isEditing', true);
		},
		saveTrack() {
			debug('save track from controller');
			this.send('closeModals');
			this.set('addTrackUrl', null);
			return true;
		},
		deleteTrack() {
			this.send('closeModals');
			return true;
		}
	}
});
