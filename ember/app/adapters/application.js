// See more at https://github.com/firebase/emberFire

var ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: dbRef
});

// where to put this serializer?
App.ApplicationSerializer = DS.FirebaseSerializer.extend();

export default ApplicationAdapter;
