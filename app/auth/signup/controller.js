import Controller from '@ember/controller'
import {inject as service} from '@ember/service'
import { get } from '@ember/object'
import {debug} from '@ember/debug'

export default Controller.extend({
	firebaseApp: service(),

	async createFirebaseUser(email, password) {
		let auth = await this.firebaseApp.auth()
		return auth.createUserWithEmailAndPassword(email, password)
	},

	onSignupError(err) {
		const messages = get(this, 'flashMessages')
		let msg

		if (err.code === 'auth/email-already-in-use') {
			msg = 'There already exists an account with the given email address.'
		}	else if (err.code === 'auth/invalid-email') {
			msg = 'Email address is not valid.'
		}	else if (err.code === 'auth/operation-not-allowed') {
			msg = 'Email/password accounts are not enabled.'
		}	else if (err.code === 'auth/weak-password') {
			msg = 'Password is not strong enough.'
		} else {
			debug('Signup error is not referenced')
		}

		if (msg) {
			messages.warning(msg, {timeout: 8000})
		}
	},

	actions: {
		async signup(provider, email, password) {
			if (!provider) return
			if (provider === 'password') {
				try {
					await this.createFirebaseUser(email, password)
					this.send('login', provider, email, password)
				} catch (error) {
					this.onSignupError(error)
					debug(error)
					return false
				}
			} else {
				this.send('login', provider)
			}
		},
		login() {
			return true
		}
	}
});
