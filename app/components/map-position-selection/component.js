import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['Map'],
	lat: 0,
  lng: 20.7421875,
  zoom: 0.7,
	location: [45.528298, -122.662986],
	actions: {
    updateCenter(e) {
			console.log('center', center)
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
    }
  }
});
