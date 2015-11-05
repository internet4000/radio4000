import Ember from 'ember';
import EmberValidations from 'ember-validations';

const {computed, debug, inject, warn} = Ember;

export default Ember.Controller.extend(EmberValidations, {
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
				flashMessages.add({
					message: 'Track saved!'
				});
			});
		},

		createNewTrack(obj) {
			const flashMessages = Ember.get(this, 'flashMessages');
			const channel = this.get('model');
			const track = this.store.createRecord('track', obj);

			// clear ui
			this.set('addTrackUrl', null);
			this.send('closeModals');

			// set channel on track and save
			debug('create new track');
			track.set('channel', channel);
			track.updateProvider();
			track.save().then(() => {
				debug('saved track');

				// Add it to the tracks relationship on the channel
				channel.get('tracks').then(tracks => {
					tracks.addObject(track);
					channel.save().then(() => {
						debug('Saved new track.');
						flashMessages.add({
							message: 'New track added!'
						});
					}, error => {
						warn('Could not create track.');
						debug(error);
					});
				});
			}, error => {
				warn('could not save track');
				debug(error);
			});
		},

		deleteTrack() {
			this.send('closeModals');
			return true;
		}
	}
});
