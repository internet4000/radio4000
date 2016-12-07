import Ember from 'ember';

const {computed, debug, get, inject} = Ember;

export default Ember.Controller.extend({
	// player: Ember.inject.service(), // used for debugging unplayed + history
	// queryParams: ['tags'],
	isEditing: false,
	applicationController: inject.controller('application'),

	hasFewTracks: computed.lte('tracks.length', 2),
	// needed to access canEdit
	channelController: inject.controller('channel'),
	canEdit: computed.reads('channelController.canEdit'),

	actions: {
		transitionToTrack(track) {
			this.transitionToRoute('track', track);
		},
		closeModals() {
			this.setProperties({
				isEditing: false,
				trackToEdit: null
			});
		},
		addTrack(url) {
			debug(`Trying to add ${url}`);
			get(this, 'applicationController').setProperties({
				newUrl: url,
				showAddTrack: true
			});
			this.set('addTrackUrl', '');
		},
		startEditingTrack(track) {
			if (!this.get('canEdit')) {
				return;
			}
			this.set('trackToEdit', track);
			this.set('isEditing', true);
		},
		updateTrack(track) {
			const flashMessages = Ember.get(this, 'flashMessages');
			if (!track.get('hasDirtyAttributes')) {
				this.send('closeModals');
				return Ember.RSVP.resolve();
			}
			// in case url changed, we need to set the ytid
			track.updateYouTubeId();
			return track.save().then(() => {
				this.send('closeModals');
				flashMessages.info('Track saved');
			});
		},
		deleteTrack(track) {
			const flashMessages = get(this, 'flashMessages');
			this.send('closeModals');
			track.get('channel').then(channel => {
				channel.get('tracks').then(() => {
					track.destroyRecord().then(() => {
						flashMessages.warning('Track deleted');
					}, () => {
						flashMessages.warning('Could not delete your track');
					});
				});
			});
		}
	}
});
