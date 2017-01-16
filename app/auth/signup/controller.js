import Ember from 'ember';

const {Controller, inject, RSVP} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),

	createUser(email, password) {
		return this.createFirebaseUser(email, password);
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
		signup(provider, email, password) {
			if (provider === 'password') {
				this.createUser(email, password);
			}
			this.send("login", provider, email, password);
		},
		login(provider, email, password) {
			return true;
		}
	}
});
