import Ember from 'ember'

const {Component, get} = Ember

export default Component.extend({
	classNames: ['Map', 'Map--fullscreen'],
	zoom: 5,
	minZoom: 2,
	maxBounds: [[-90, -180], [90, 180]],
	actions: {
		updateCenter(e) {
			Ember.debug('updateCenter')
			const center = e.target.getCenter()
			const lat = center.lat
			const lng = center.lng
			const zoom = e.target.getZoom()
			const position = {lat, lng, zoom}
			get(this, 'onUpdateCenter')(position)
		}
	}
})
