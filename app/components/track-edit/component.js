import { oneWay } from '@ember/object/computed';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import TrackFormComponent from 'radio4000/components/track-form/component';

export default TrackFormComponent.extend({
	// Track model to edit
	track: null,
	// Functions passed as a properties
	onSubmit: null,
	onDelete: null,

	disableSubmit: oneWay('track.validations.isInvalid'),

	submitTask: task(function * (event) {
		event.preventDefault()
		yield get(this, 'track.update').perform();
		get(this, 'flashMessages').success('Track updated')
		yield get(this, 'onSubmit')()
	}).drop(),

	deleteTrack: task(function * (event) {
		event.preventDefault()
		yield get(this, 'track.delete').perform();
		get(this, 'flashMessages').success('Track deleted')
		yield get(this, 'onDelete')()
	}).drop()
});
