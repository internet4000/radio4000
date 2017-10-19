import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['Map', 'Map--fullscreen'],
  zoom: 2,
	maxZoom: 2,
	maxBounds: [[90,-180], [90, 180]],
	actions: {
    updateCenter(e) {
			console.log(e)
      let center = e.target.getCenter();
			let zoom = e.target.getZoom();
			console.log(zoom)
      this.set('lat', center.lat);
      this.set('lng', center.lng);
			this.set('zoom', zoom);
    }
  }
});
