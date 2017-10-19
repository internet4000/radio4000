import Ember from 'ember';

const {Controller} = Ember;

export default Controller.extend({
	queryParams: ['lat', 'lng', 'zoom'],
	lat: 0,
  lng: 20.7421875,
	zoom: 2
});
