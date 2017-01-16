import Ember from 'ember';

const {Controller, get, inject, RSVP} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),

	createFirebaseUser(email, password) {
		return new RSVP.Promise((resolve, reject) => {
			get(this, 'firebaseApp').auth()
				.createUserWithEmailAndPassword(email, password)
				.then(authData => resolve(authData.uid))
				.catch(err => reject(err));
		});
	},

	actions: {
		signup(provider, email, password) {
			const flashMessages = get(this, 'flashMessages');

			if (provider === 'password') {
				this.createFirebaseUser(email, password).then(() => {
					this.send('login', provider, email, password);
				}).catch(err => {
					flashMessages.warning(err, {timeout: 4000});
				});
			} else {
				this.send('login', provider);
			}
		},
		login() {
			return true;
		}
	}
});
