import Ember from 'ember'
import { and, not, equal, hash } from 'ember-awesome-macros'
import {L} from 'ember-leaflet'
const { Component, computed, get, set } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	// lat
	// lng
	zoom: 5,

	init() {
		this._super(...arguments)
		this.set('maxBounds', [[90, -180], [-90, 180]])
	},

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
			const credits = L.control.attribution({
				position: 'bottomright',
				prefix: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
			}).addAttribution(`
<a href="https://opentopomap.org/about" target="_blank" rel="noopener">OpenTopoMap</a> |
<a href="http://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>
`)

			map.addControl(credits)
			map.zoomControl.setPosition('topright')
			set(this, 'map', map)
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
