import Ember from 'ember'
import { task, timeout } from 'ember-concurrency'

const { Component, get } = Ember

export default Component.extend({
	classNames: ['Map'],
	zoom: 5,
	minZoom: 2,
	maxBounds: [[-90, -180], [90, 180]],

	throttledUpdate: task(function * (position) {
		yield timeout(200)
		get(this, 'onUpdate')(position)
	}).drop(),

	actions: {
		updateCenter(e) {
			// Create object with lat, lng and zoom.
			const center = e.target.getCenter()
			const position = {
				lat: center.lat,
				lng: center.lng,
				zoom: e.target.getZoom()
			}

			// Send it back up - but throttled - to avoid
			// "modify twice in a single render"
			get(this, 'throttledUpdate').perform(position)
		}
	}
})
