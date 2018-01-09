import Ember from 'ember';

const {Controller, get, inject, computed} = Ember

export default Controller.extend({
	queryParams: ['editTrack'],
	player: inject.service(),

	editTrack: null,

	trackToEdit: Ember.computed('editTrack', function () {
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
