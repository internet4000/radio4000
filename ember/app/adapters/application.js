/* global Firebase */

// See more at https://github.com/firebase/emberFire

var ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase('https://muchplay.firebaseio.com')
});

export default ApplicationAdapter;
