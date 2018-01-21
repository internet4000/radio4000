import Ember from 'ember';

const {Controller, get, inject, computed} = Ember

export default Controller.extend({
	queryParams: ['editTrack'],
	player: inject.service(),

	// Pass a track id.
	editTrack: null,

	trackToEdit: computed('editTrack', function () {
		return this.store.peekRecord('track', get(this, 'editTrack'))
	}),

	actions: {
		stopEditing() {
			this.setProperties({
				editTrack: null
			})
		}
	}
});
