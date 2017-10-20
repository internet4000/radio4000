import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['Map', 'Map--fullscreen'],
  zoom: 5,
	minZoom: 2,
	maxBounds: [[-90,-180], [90, 180]],
	actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
			let zoom = e.target.getZoom();

      this.setProperties({
				'lat': center.lat,
				'lng': center.lng,
				'zoom': zoom
			});
    }
  }
});
