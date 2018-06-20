import Controller from '@ember/controller'
import {get} from '@ember/object'
import {task} from 'ember-concurrency'

export default Controller.extend({
	saveCoordinates: task(function * (lat, lng) {
		const channel = get(this, 'model')
		channel.setProperties({
			coordinatesLatitude: lat,
			coordinatesLongitude: lng
		})
		yield channel.save()
	}).drop()
})
