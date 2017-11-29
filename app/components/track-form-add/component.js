import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';
import {Validations} from 'radio4000/models/track';

const {
	inject,
	get,
	set,
	computed
} = Ember;

// Use a normal object instead af a model.
// This avoids it appearing in the UI before it is saved.
const trackObject = Ember.Object.extend(Validations);

export default TrackFormComponent.extend({
	player: inject.service(),
	disableSubmit: computed.or('submitTask.isRunning', 'isSubmitting', 'track.validations.isInvalid'),

	// Called on init as well as after submitting a track.
	// Also see the same method on the `TrackForm` component, from which this extends.
	resetForm() {
		// The getOwner part is mentioned in the ember-cp-validation docs.
		const track = trackObject.create(Ember.getOwner(this).ownerInjection(), {
			url: get(this, 'initialUrl')
		});
		set(this, 'track', track);
		this._super(...arguments);
	},

	init() {
		this._super(...arguments);
		this.resetForm();
	},
	actions: {
		prefillCurrentTrack() {
			const currentTrack = get(this, 'player.currentTrack');
			console.log('currentTrack', currentTrack)
			get(this, 'track').setProperties({
				url: currentTrack.get('url'),
				body: `thx @${currentTrack.channel.slug}`
			});
		}
	}

});
