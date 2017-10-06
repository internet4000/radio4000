import { or } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import EmberObject, { set, get } from '@ember/object';
import TrackFormComponent from 'radio4000/components/track-form/component';
import { Validations } from 'radio4000/models/track';

// Use a normal object instead af a model.
// This avoids it appearing in the UI before it is saved.
const trackObject = EmberObject.extend(Validations);

export default TrackFormComponent.extend({
	disableSubmit: or('submitTask.isRunning', 'isSubmitting', 'track.validations.isInvalid'),

	// Called on init as well as after submitting a track.
	// Also see the same method on the `TrackForm` component, from which this extends.
	resetForm() {
		// The getOwner part is mentioned in the ember-cp-validation docs.
		const track = trackObject.create(getOwner(this).ownerInjection(), {
			url: get(this, 'initialUrl')
		});
		set(this, 'track', track);
		this._super(...arguments);
	},

	init() {
		this._super(...arguments);
		this.resetForm();
	}
});
