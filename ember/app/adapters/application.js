/* global Firebase */

// See more at https://github.com/firebase/emberFire

var ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase('https://muchplay.firebaseio.com')
});

// where to put this serializer? and what is it?
// App.ApplicationSerializer = DS.FirebaseSerializer.extend();

export default ApplicationAdapter;
