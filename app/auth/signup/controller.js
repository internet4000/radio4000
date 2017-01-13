import Ember from 'ember';

const {Controller, inject, RSVP} = Ember;

export default Ember.Controller.extend({
    firebaseApp: inject.service(),
    login() {
	return true
    },
    createUser(email, password) {
	return this.createFirebaseUser(email, password)
	    .then(this.login(email,password))
	    // .then(uid => this.createInternalUser(uid));
    },
    createFirebaseUser(email, password) {
	return new RSVP.Promise((resolve, reject) => {
	    this.get('firebaseApp').auth()
		.createUserWithEmailAndPassword(email, password)
		.then(authData => resolve(authData.uid))
		.catch(err => reject(err));
	});
    },
    actions: {
	signup(data) {
	    console.log("signup controller action", data);
	    if (data.provider === 'password') {
		this.createUser(data.email, data.password);
	    }
	    // create a new firebase.user
	    // if success -> create r4.user -> redirect to newuser
	    // if fail -> why did it fail.
	}
    }
});
