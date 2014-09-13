import DS from 'ember-data';
// import ENV from 'app/environment';

export default DS.FirebaseAdapter.extend({
	// firebase: new window.Firebase('https://' + ENV.firebase_instance + '.firebaseio.com')
	firebase: new window.Firebase('https://muchplay.firebaseio.com')
});
