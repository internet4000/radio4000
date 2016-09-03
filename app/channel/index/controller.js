import Ember from 'ember';
import EmberValidations from 'ember-validations';
import createTrackMixin from 'radio4000/mixins/create-track';

const {computed, debug, get, inject} = Ember;

export default Ember.Controller.extend(EmberValidations, createTrackMixin, {
	// player: Ember.inject.service(), // used for debugging unplayed + history
	// queryParams: ['tags'],
	isEditing: false,
	applicationController: inject.controller('application'),

	// needed to access canEdit
	channelController: inject.controller('channel'),
	canEdit: computed.reads('channelController.canEdit'),
	hasFewTracks: computed.lte('tracks.length', 2),

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
				debug('nothing to save on track');
				this.send('closeModals');
				return;
			}

			// in case url changed, we need to set the ytid
			debug('saving track');
			track.updateYouTubeId().save().then(() => {
				this.send('closeModals');
				flashMessages.info('Track saved');
			});
		},
		deleteTrack() {
			this.send('closeModals');
			return true;
		}
	}
});
