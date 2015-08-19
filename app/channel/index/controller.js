import Ember from 'ember';

const { computed, debug } = Ember;

export default Ember.Controller.extend({
	// player: Ember.inject.service(), // used for debugging unplayed + history
	isAdding: false,
	isEditing: false,

	// needed to access canEdit
	channel: Ember.inject.controller(),
	canEdit: computed.alias('channel.canEdit'),

	actions: {
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

			return true; // bubble up!
		},

		deleteTrack(track) {
			track.get('channel').then((channel) => {

				// first remove from parent
				channel.get('tracks').then((tracks) => {
					tracks.removeObject(track);

					debug('removing track from channel');

					channel.save().then(() => {
						debug('saved channel');
					});

					// then itself
					track.destroyRecord();
					this.send('closeModals');
				});
			});
		},

		closeModals() {
			this.setProperties({
				isEditing: false,
				isAdding: false,
				trackToEdit: null
			});
		}
	}
});

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
