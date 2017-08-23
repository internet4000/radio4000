import Ember from 'ember';
import {task} from 'ember-concurrency';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get,
			 computed} = Ember;

export default TrackFormComponent.extend({
	disableSubmit: computed.oneWay('track.validations.isInvalid'),
	actions: {
		cancel() {
			get(this, 'cancel')();
		},
		delete: task(function *() {
			return get(this, 'track.delete').perform();
		}).drop(),
		update: task(function *() {
			return get(this, 'track.update').perform();
		}).drop()
	}
});
