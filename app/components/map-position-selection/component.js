import Ember from 'ember';
import {task} from 'ember-concurrency';

const { Component, get } = Ember

export default Component.extend({
	classNames: ['Map', 'Map--selection'],
	newLat: 0,
	newLng: 20.7421875,
	zoom: 0.7,
	maxBounds: [[90, -180], [-90, 180]],
	actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
      this.setProperties({
				'newLat': center.lat,
				'newLng': center.lng
			});
    },
		updateCoordinates: task(function * (lat, lng) {
			yield get(this, 'updateCoordinates').perform();
		}).drop()
  }
});
