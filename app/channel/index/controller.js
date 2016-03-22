import Ember from 'ember';
import EmberValidations from 'ember-validations';
import createTrackMixin from 'radio4000/mixins/create-track';

const {computed, debug, inject} = Ember;

export default Ember.Controller.extend(EmberValidations, createTrackMixin, {
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
			// this.transitionToRoute({
			// 	queryParams: {
			// 		listen: track.get('id')
			// 	}
			// });
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
			console.log(this.get('addTrackUrl'));
			this.set('isAdding', true);
		},

		startEditingTrack(track) {
			this.set('trackToEdit', track);
			this.set('isEditing', true);
		},

		saveTrack(track) {
			const flashMessages = Ember.get(this, 'flashMessages');

			if (!track.get('hasDirtyAttributes')) {
				debug('nothing to save on track');
				this.send('closeModals');
				return;
			}

			// in case url changed, we need to set the ytid
			debug('saving track');
			track.updateProvider();
			track.save().then(() => {
				this.send('closeModals');
				flashMessages.info('Track saved');
			});
		},

		createNewTrack(trackProperties) {
			const channel = this.get('model');

			// Clear the UI so we can continue
			this.set('addTrackUrl', null);
			this.send('closeModals');

			// Save via our mixin.
			this.createTrack(trackProperties, channel);
		},

		deleteTrack() {
			this.send('closeModals');
			return true;
		}
	}
});
