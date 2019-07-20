import Ember from 'ember';

const {Controller, get, inject, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),

	createFirebaseUser(email, password) {
		let auth = get(this, 'firebaseApp').auth();
		return auth.createUserWithEmailAndPassword(email, password);
	},

	onSignupError(err) {
		const messages = get(this, 'flashMessages');
		let msg;

		if (err.code === 'auth/email-already-in-use') {
			msg = 'There already exists an account with the given email address.';
		}	else if (err.code === 'auth/invalid-email') {
			msg = 'Email address is not valid.';
		}	else if (err.code === 'auth/operation-not-allowed') {
			msg = 'Email/password accounts are not enabled.';
		}	else if (err.code === 'auth/weak-password') {
			msg = 'Password is not strong enough.';
		} else {
			debug('Signup error is not referenced');
			debug(err);
		}

		if (msg) {
			messages.warning(msg, {timeout: 8000});
		}
	},

	actions: {
		signup(provider, email, password) {
			if (provider === 'password') {
				return this.createFirebaseUser(email, password).then(() => {
					this.send('login', provider, email, password);
				}).catch(err => {
					this.onSignupError(err);
				});
			}
			this.send('login', [provider]);
		},
		login() {
			return true;
		}
	}
});
