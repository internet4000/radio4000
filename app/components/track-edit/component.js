import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get, computed} = Ember;

export default TrackFormComponent.extend({
	disableSubmit: computed.oneWay('track.validations.isInvalid'),
	actions: {
		cancel() {
			this._super();
			get(this, 'track').rollbackAttributes();
		},
		deleteTrack() {
			this.get('onDeleteTrack')(get(this, 'track'));
		}
	}
});
