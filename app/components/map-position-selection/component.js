import Ember from 'ember'
import { and, not, equal, hash } from 'ember-awesome-macros'
import {L} from 'ember-leaflet'
const { Component, computed, get, set } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	// lat
	// lng
	zoom: 5,
	maxBounds: [[90, -180], [-90, 180]],

	location: hash('lat', 'lng'),
	hasLocation: and('lat', 'lng'),

	// Updated by the leaflet map via an action.
	currentLat: null,
	currentLng: null,
	showButtons: not(equal('lat', 'currentLat'), equal('lng', 'currentLng')),

	icon: computed('', {
		get() {
			return L.divIcon({
				className: 'MapMarker',
				iconSize: [32, 32]
			})
		}
	}),

	actions: {
		initMap(event) {
			const map = event.target
			set(this, 'map', map)
			map.zoomControl.setPosition('topright')
		},
		updateCenter(e) {
			const center = e.target.getCenter()
			this.setProperties({
				currentLat: center.lat,
				currentLng: center.lng
			})
		},
		cancel() {
			const map = get(this, 'map')
			const location = get(this, 'location')
			location.zoom = get(this, 'zoom')
			map.flyTo(location)
		}
	}
})
