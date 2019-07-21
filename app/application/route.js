import Route from '@ember/routing/route'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'
import {inject as service} from '@ember/service'
import KeyboardShortcutsGlobal from 'radio4000/mixins/keyboard-shortcuts-global'

export default Route.extend(ApplicationRouteMixin, KeyboardShortcutsGlobal, {
	session: service(),
	player: service(),

	// from ember simple auth
	routeAfterAuthentication: 'auth.login',

	beforeModel() {
		// if user is already authenticated, load it.
		if (this.session.isAuthenticated) {
			this.loadCurrentUser()
		}
	},

	sessionAuthenticated() {
		this.loadCurrentUser()
		this._super(...arguments)
	},

	// sessionInvalidated() {
	// 	console.log('no')
	// 	this._super(...arguments)
	// },

	// Runs after a user has authenticated.
	// Loads the R4 user model from a Firebase UID and stores it in the session.data.
	async loadCurrentUser() {
		const firebaseUserUid = this.session.get('data.authenticated.user.uid')
		const user = await this.store.findRecord('user', firebaseUserUid)

		console.log('Found R4 user from login, storing in session.')

		this.set('session.data.currentUser', user)

		const channels = await user.get('channels')
		const userChannel = channels.get('firstObject')

		console.log({userChannel})

		if (userChannel) {
			return this.replaceWith('channel', userChannel)
		}
		return this.replaceWith('channels.new')
	}
})
