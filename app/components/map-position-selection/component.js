import Ember from 'ember'
import {task} from 'ember-concurrency'

const { Component,
				computed,
				get } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	newLat: 0,
	newLng: 20.7421875,
	location: computed('lat', 'lng', function () {
		const lat = get(this, 'lat'),
					lng = get(this, 'lng');
		return { lat, lng }
	}),
	zoom: 0.7,
	maxBounds: [[90, -180], [-90, 180]],
	actions: {
		update: task(function * () {
			console.log(test)
		})
	}
})
