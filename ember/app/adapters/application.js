/* global Firebase */
// import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
	// See more at https://github.com/firebase/emberFire
	firebase: new Firebase('https://muchplay.firebaseio.com')
});
