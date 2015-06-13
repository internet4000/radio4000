import Ember from 'ember';

const { computed, debug } = Ember;

export default Ember.Controller.extend({
	// player: Ember.inject.service(), // used for debugging unplayed + history
	isShowingModal: false,

	// needed to access canEdit
	needs: ['channel'],
	canEdit: computed.alias('controllers.channel.canEdit'),

	sortProperties: ['created:desc'],
	sortedModel: computed.sort('model', 'sortProperties'),

	actions: {
		addTrack() {
			let url = this.get('newTrackUrl');

			this.transitionToRoute('channel.add', {
				queryParams: { url: url }
			});

			this.set('newTrackUrl', '');
			// let newTrack = this.store.createRecord('track', {
			// 	url: url
			// });
			// this.set('newTrack', newTrack);
			// this.set('isShowingAdd', true);
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
				debug('Saved track');
			});

			this.send('closeModals');
			this.set('newTrackUrl', '');
		},

		deleteTrack(track) {
			track.get('channel').then((channel) => {

				// first remove from parent
				channel.get('tracks').then((tracks) => {
					tracks.removeObject(track);

					debug('Removing track from channel.');

					channel.save().then(() => {
						debug('Saved channel.');
					});

					// then itself
					track.destroyRecord();
					this.send('closeModals');
				});
			});
		}
	}

	// queryParams: ['tags'],

	// Helpers to show contextual UI helpers
	// hasImage: computed.notEmpty('model.coverImage'),

	// todo remove this
	// it's only needed because of our model hook which doesn't update deleted tracks
	// filteredModel: computed.filter('model.@each.isDeleted', function(item) {
	// 	return !item.get('isDeleted');
	// }),

	// noTracks: computed.equal('model.tracks.length', 0),
	// oneTrack: computed.equal('model.tracks.length', 1),
	// moreTracks: computed.gt('model.tracks.length', 0),
	// showHelp: computed('canEdit', 'model.tracks.[]', function() {
	// 	return this.get('canEdit') && this.get('model.tracks.length') < 2;
	// })
});
