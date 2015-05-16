import Ember from 'ember';

export default Ember.Controller.extend({
	isShowingModal: false,
	actions: {
		addTrack() {
			let url = this.get('newTrackUrl');
			let newTrack = this.store.createRecord('track', {
				url: url
			});

			this.set('newTrack', newTrack);
			this.set('isShowingAdd', true);
		},

		editTrack(track) {
			this.set('trackToEdit', track);
			this.set('isShowingModal', true);
		},

		closeModals() {
			this.setProperties({
				isShowingModal: false,
				isShowingAdd: false,
				trackToEdit: null
			});
		},

		saveTrack(track) {
			// in case url changed, we need to set the ytid
			track.updateProvider();
			track.save().then(() => {
				Ember.debug('Saved track');
			});

			this.send('closeModals');
			this.set('newTrackUrl', '');
		},

		deleteTrack(track) {
			track.get('channel').then((channel) => {

				// first remove from parent
				channel.get('tracks').then((tracks) => {
					tracks.removeObject(track);

					Ember.debug('Removing track from channel.');

					channel.save().then(() => {
						Ember.debug('Saved channel.');
					});

					// then itself
					track.destroyRecord();
					this.send('closeModals');
				});
			});
		}
	},

	// queryParams: ['tags'],

	// these are needed to pass some props down to tracks-list component
	needs: ['channel'],
	// canEdit: Ember.computed.alias('controllers.channel.canEdit'),

	// Helpers to show contextual UI helpers
	// hasImage: Ember.computed.notEmpty('model.coverImage'),

	// todo remove this
	// it's only needed because of our model hook which doesn't update deleted tracks
	filteredModel: Ember.computed.filter('model.@each.isDeleted', function(item) {
		return !item.get('isDeleted');
	}),

	sortProperties: ['created:desc'],
	sortedModel: Ember.computed.sort('filteredModel', 'sortProperties')

	// noTracks: Ember.computed.equal('model.tracks.length', 0),
	// oneTrack: Ember.computed.equal('model.tracks.length', 1),
	// moreTracks: Ember.computed.gt('model.tracks.length', 0),
	// showHelp: Ember.computed('canEdit', 'model.tracks.[]', function() {
	// 	return this.get('canEdit') && this.get('model.tracks.length') < 2;
	// })
});
