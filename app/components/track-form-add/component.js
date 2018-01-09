import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';
import {Validations} from 'radio4000/models/track';

const {
	get,
	set,
	computed,
	inject
} = Ember;

// Use a normal object instead af a model.
// This avoids it appearing in the UI before it is saved.
const trackObject = Ember.Object.extend(Validations);

export default TrackFormComponent.extend({
	player: inject.service(),
	session: inject.service(),
	flashMessages: inject.service(),
	disableSubmit: computed.or('submitTask.isRunning', 'isSubmitting', 'track.validations.isInvalid'),

	// Called on init as well as after submitting a track.
	// Also see the same method on the `TrackForm` component, from which this extends.
	resetForm() {
		// The getOwner part is mentioned in the ember-cp-validation docs.
		const track = trackObject.create(Ember.getOwner(this).ownerInjection(), {
			url: get(this, 'initialUrl'),
			title: get(this, 'initialTitle'),
			body: get(this, 'initialBody')
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
			get(this, 'track').setProperties({
				url: currentTrack.get('url'),
				title: currentTrack.get('title'),
				body: `thanks @${currentTrack.get('channel.slug')}`
			});
		},
		inviteToPremium() {
			const message = `Hello!
This feature is for upgraded channels only.
Go to your settings to upgrade your radio.`
			get(this, 'flashMessages').info(message)
		}
	}
});
