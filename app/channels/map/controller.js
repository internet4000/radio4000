import Ember from 'ember';
import {task, timeout} from 'ember-concurrency'

const {Controller, get} = Ember;

export default Controller.extend({
	queryParams: ['lat', 'lng', 'zoom'],
	lat: 22.105998799750566,
	lng: 33.04687500000001,
	zoom: 2,

	// If we do not throttle this,
	// we get errors trying to "modify twice in a single render".
	updatePosition: task(function * (pos) {
		yield timeout(200)
		this.setProperties({
			lat: pos.lat,
			lng: pos.lng,
			zoom: pos.zoom
		})
	}).drop(),

	actions: {
		updatePosition(pos) {
			get(this, 'updatePosition').perform(pos)
		}
	}
});
