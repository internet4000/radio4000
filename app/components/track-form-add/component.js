import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';
import {Validations} from 'radio4000/models/track';

const {get, set, computed} = Ember;

// Use a normal object instead af a model.
// This avoids it appearing in the UI before it is saved.
const trackObject = Ember.Object.extend(Validations);

export default TrackFormComponent.extend({
	initialUrl: '',

	disableSubmit: computed.or('isSubmitting', 'track.validations.isInvalid'),

	resetTrack() {
		// The getOwner part is mentioned in the ember-cp-validation docs.
		const track = trackObject.create(Ember.getOwner(this).ownerInjection(), {
			url: get(this, 'initialUrl')
		});
		set(this, 'track', track);
	},

	init() {
		this._super(...arguments);
		this.resetTrack();
	}
});
