import Ember from 'ember';

const {Controller, get, inject} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),

	createFirebaseUser(email, password) {
		let auth = get(this, 'firebaseApp').auth();
		return auth.createUserWithEmailAndPassword(email, password);
	},

	actions: {
		signup(provider, email, password) {
			const messages = get(this, 'flashMessages');

			if (provider === 'password') {
				return this.createFirebaseUser(email, password).then(() => {
					this.send('login', provider, email, password);
				}).catch(err => {
					messages.warning(err, {timeout: 8000});
				});
			}

			this.send('login', provider);
		},
		login() {
			return true;
		}
	}
});
