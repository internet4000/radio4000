import Ember from 'ember';
import resetScroll from 'radio4000/mixins/reset-scroll'

const {Controller, get, inject, computed} = Ember

export default Controller.extend(resetScroll, {
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
