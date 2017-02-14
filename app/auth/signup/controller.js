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

		if (err.code === 'auth/email-already-in-use') {
			message = 'There already exists an account with the given email address.';
		}	else if (err.code === 'auth/invalid-email') {
			message = 'Email address is not valid.';
		}	else if (err.code === 'auth/operation-not-allowed') {
			message = 'Email/password accounts are not enabled.';
		}	else if (err.code === 'auth/weak-password') {
			message = 'Password is not strong enough.';
		} else {
			debug('Signup error is not referenced');
		}
		messages.warning(message, {timeout: 8000});
	},

	actions: {
		signup(provider, email, password) {
			if (provider === 'password') {
				return this.createFirebaseUser(email, password).then(() => {
					this.send('login', provider, email, password);
				}).catch(err => {
					this.onSignupError(err)
				});
			}

			this.send('login', provider);
		},
		login() {
			return true;
		}
	}
});
