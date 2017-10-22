import Ember from 'ember'
import { not, equal } from 'ember-awesome-macros'

const { Component, computed, get, set } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	// lat
	// lng
	zoom: 2,
	maxBounds: [[90, -180], [-90, 180]],

	// Updated by the leaflet map via an action.
	currentLat: null,
	currentLng: null,

	showButtons: not(equal('lat', 'currentLat'), equal('lng', 'currentLng')),

	location: computed('lat', 'lng', function() {
		const lat = get(this, 'lat')
		const lng = get(this, 'lng')
		return { lat, lng }
	}),

	actions: {
		updateCenter(e) {
			console.log('update center')
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
		setLeafletInstance(event) {
			set(this, 'leafletInstance', event.target)
		}
	}
})
