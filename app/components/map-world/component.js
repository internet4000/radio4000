import Ember from 'ember'
import { task, timeout } from 'ember-concurrency'
import {L} from 'ember-leaflet'

const { Component, get, computed } = Ember

export default Component.extend({
	classNames: ['Map'],
	// lat,
	// lng
	zoom: 5,
	minZoom: 2,
	maxBounds: [[-90, -180], [90, 180]],

	icon: computed('', {
		get() {
			return L.divIcon({
				className: 'MapMarker',
				iconSize: [32, 32]
			})
		}
	}),

	throttledUpdate: task(function * (position) {
		yield timeout(200)
		get(this, 'onUpdate')(position)
	}).drop(),

	actions: {
		initMap(event) {
			const map = event.target
			map.zoomControl.setPosition('topright')
		},
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
