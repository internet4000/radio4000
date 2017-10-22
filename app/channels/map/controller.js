import Ember from 'ember'

const { Controller, computed } = Ember

export default Controller.extend({
	queryParams: ['lat', 'lng', 'zoom'],
	lat: 22.105998799750566,
	lng: 33.04687500000001,
	zoom: 2,

	channelsWithCoordinates: computed.filter('model', function(channel) {
		return (
			channel.get('coordinatesLatitude') &&
			channel.get('coordinatesLongitude')
		)
	}),

	actions: {
		updatePosition(pos) {
			console.log(pos)
			this.setProperties({
				lat: pos.lat,
				lng: pos.lng,
				zoom: pos.zoom
			})
		}
	}
})
