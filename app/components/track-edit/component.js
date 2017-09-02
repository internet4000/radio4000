import Ember from 'ember';
import {task} from 'ember-concurrency';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get,
			 computed} = Ember;

export default TrackFormComponent.extend({
	// track model to edit
	track: null,
	// function passed as a prop
	transitionRoute: null,
	disableSubmit: computed.oneWay('track.validations.isInvalid'),

	notify(message) {
		const messages = get(this, 'flashMessages');
		messages.success(message);
	},

	updateTrack: task(function * () {
		yield get(this, 'track.update').perform();
		this.notify('Track updated');
		yield get(this, 'transitionRoute')()
	}).drop(),

	deleteTrack: task(function * () {
		yield get(this, 'track.delete').perform();
		this.notify('Track deleted');
		yield get(this, 'transitionRoute')()
	}).drop(),

	actions: {
		cancel() {
			get(this, 'cancel')();
		}
	}
});
