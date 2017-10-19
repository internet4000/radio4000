import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['Map', 'Map--fullscreen'],
	lat: 9.96885060854611,
  lng: 53.08593750,
  zoom: 2,
	emberConfLocation: [45.528298, -122.662986],
  hotel: [45.530891, -122.655504],
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
