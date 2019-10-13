/* eslint-disable no-console */
import Route from '@ember/routing/route'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'
import {inject as service} from '@ember/service'
import KeyboardShortcutsGlobal from 'radio4000/mixins/keyboard-shortcuts-global'
import RSVP from 'rsvp'

export default Route.extend(ApplicationRouteMixin, KeyboardShortcutsGlobal, {
	session: service(),
	player: service(),

	// from ember simple auth
	routeAfterAuthentication: 'auth.login',

	beforeModel() {
		if (this.session.isAuthenticated) {
			console.log('Already authenticated')
			this.setupUser(true)
		}
	},

	sessionAuthenticated() {
		console.log('sessionAuthenticated')
		this.setupUser()
		this._super(...arguments)
	},

	// After authenticating as a Firebase user, we use the uid
	// to connect it with a Radio4000 user model.
	async setupUser(shouldRedirect) {
		const uid = this.session.get('data.authenticated.user.uid')
		let user

		try {
			console.log('Checking if we have an R4 user model from the UID...')
			user = await this.store.findRecord('user', uid)
			await user.save()
		} catch (err) {
			console.log('No user, creating')
			user = this.store.createRecord('user', {id: uid})
		}

		try {
			await user.save()
			console.log('Saved new user')
		} catch(err) {
			console.log('Could not save new user', err)
			return this.session.invalidate()
		}

		try {
			await this.createUserSetting(user)
			console.log('Saved user settings')
		} catch (err) {
			console.log('Could not create new user settings', err)
			return this.session.invalidate()
		}

		// store.recordForId('user', id).unloadRecord()

		// Store the user model in the session so it's available everywhere.
		console.log('Found R4 user. Storing as currentUser', {user})
		this.set('session.data.currentUser', user)

		if (shouldRedirect)  {
			this.redirectAfterAuth()
		}
	},

	// Returns a promise that resolves either a new user-setting or an already existing one.
	createUserSetting(user) {
		const hasSettings = user.belongsTo('settings').id()
		console.log({hasSettings})

		if (hasSettings) {
			console.log('User already has settings')
			return RSVP.Promise.resolve(user.get('settings.firstObject'))
		}

		console.log('No user settings found, creating…')

		const userSetting = this.get('store').createRecord('user-setting', {user})

		return new RSVP.Promise(resolve => {
			userSetting.save().then(() => {
				user.set('settings', userSetting)
				user.save().then(() => {
					console.log('created new user settings')
					resolve(userSetting)
				})
			})
		})
	},

	async redirectAfterAuth() {
		const user = this.get('session.data.currentUser')

		// See if the user has a channel to redirect to.
		const channels = await user.get('channels')
		const userChannel = channels.get('firstObject')

		console.log(`Redirecting to ${userChannel ? 'user channel' : 'new channel form'}`)

		if (userChannel) {
			return this.replaceWith('channel', userChannel)
		}
		return this.replaceWith('channels.new')
	}
})
