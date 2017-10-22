import Ember from 'ember'
import {task} from 'ember-concurrency'

const { Component,
				computed,
				get } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	showButtons: false,
	newLat: 0,
	newLng: 20.7421875,
	location: computed('lat', 'lng', function () {
		const lat = get(this, 'lat'),
					lng = get(this, 'lng');
		return { lat, lng }
	}),
	zoom: 0.7,
	maxBounds: [[90, -180], [-90, 180]],

	update: task(function * () {
		console.log(test)
	}),

	actions: {
		updateCenter() {
			this.set('showButtons', true)
		},
		cancel() {
			this.set('showButtons', false)
			console.log(this.$())
			this.$().panTo(get(this, 'location'))
		}
	}
})
