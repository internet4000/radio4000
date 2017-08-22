import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get,
			 computed} = Ember;

export default TrackFormComponent.extend({
	disableSubmit: computed.oneWay('track.validations.isInvalid'),
	actions: {
		cancel() {
			get(this, 'cancel')();
		},
		deleteTrack() {
			return get(this, 'track.deleteTrack').perform();
		}
	}
});
