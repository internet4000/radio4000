import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';
import {Validations} from 'radio4000/models/track';

const {get, set, computed} = Ember;

export default TrackFormComponent.extend({
	// This component extends the track form by supporting a `initialUrl` property
	// that is used to create a new track.
	initialUrl: null,

	disableSubmit: computed.or('isSubmitting', 'track.validations.isInvalid'),

	init() {
		this._super(...arguments);

		// Creating a real track model immediately pushes it into the store,
		// which we do not want, because it'll appear in the interface.
		// Instead we use this pseudoTrack, which is LATER converted into a track model.
		// The getOwner part is mentioned in the ember-cp-validation docs.
		const pseudoTrack = Ember.Object.extend(Validations);
		const track = pseudoTrack.create(Ember.getOwner(this).ownerInjection(), {
			url: get(this, 'initialUrl')
		});
		set(this, 'track', track);
	}
});
