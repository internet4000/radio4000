import Ember from 'ember';

const {computed, debug, get, inject} = Ember;

export default Ember.Controller.extend({
	isEditing: false,
	applicationController: inject.controller('application'),

	hasFewTracks: computed.lte('tracks.length', 2),
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
			const flashMessages = get(this, 'flashMessages');

			// Close the modal, if the modal isn't edited.
			if (!track.get('hasDirtyAttributes')) {
				this.send('closeModals');
				return Ember.RSVP.resolve();
			}

			// In case url changed, we need to set the ytid.
			track.updateYoutubeId();
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
