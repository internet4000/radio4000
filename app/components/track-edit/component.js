import Ember from 'ember';
import {task} from 'ember-concurrency';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get, computed} = Ember;

export default TrackFormComponent.extend({
	track: null,
	disableSubmit: computed.oneWay('track.validations.isInvalid'),

	updateTrack: task(function * () {
		yield get(this, 'track.update').perform();
		console.log('updated track')
	}).drop(),

	deleteTrack: task(function * () {
		yield get(this, 'track.delete').perform();
		console.log('deleted track')
	}).drop(),

	actions: {
		cancel() {
			get(this, 'cancel')();
		}
	}
});
