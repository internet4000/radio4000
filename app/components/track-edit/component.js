import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get} = Ember;

export default TrackFormComponent.extend({
	actions: {
		cancel() {
			this._super();
			get(this, 'track').rollbackAttributes();
		},
		deleteTrack() {
			this.sendAction('deleteTrack', get(this, 'track'));
		}
	}
});
