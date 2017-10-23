import Ember from 'ember'
import { and, not, equal, hash } from 'ember-awesome-macros'
const { Component, get, set } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	// lat
	// lng
	zoom: 3,
	maxBounds: [[90, -180], [-90, 180]],

	location: hash('lat', 'lng'),
	hasLocation: and('lat', 'lng'),

	// Updated by the leaflet map via an action.
	currentLat: null,
	currentLng: null,
	showButtons: not(equal('lat', 'currentLat'), equal('lng', 'currentLng')),

	actions: {
		updateCenter(e) {
			const center = e.target.getCenter()
			this.setProperties({
				currentLat: center.lat,
				currentLng: center.lng
			})
		},
		cancel() {
			const instance = get(this, 'leafletInstance')
			instance.flyTo(get(this, 'location'))
		},
		initMap(event) {
			set(this, 'leafletInstance', event.target)
			event.target.zoomControl.setPosition('bottomright')
		}
	}
})
