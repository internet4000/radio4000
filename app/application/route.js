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
			this.setupUser(true)
		}
	},

	sessionAuthenticated() {
		this.setupUser()
		this._super(...arguments)
	},

	async setupUser(shouldRedirect) {
		const uid = this.session.get('data.authenticated.user.uid')
		let user

		try {
			// Get user model from the Firebase UID.
			user = await this.store.findRecord('user', uid)
			console.log('found user')
		} catch (err) {
			console.log('no user, creating')
			// ... or create a new user with settings.
			user = this.store.createRecord('user', {id: uid});
			try {
				await user.save()
				await this.createUserSetting(user)
				console.log('saved new user + settings')
			} catch (err) {
				console.log('could not create new user model', err)
				return this.session.invalidate()
			}
		}

		// Store the user model in the session so it's available everywhere.
		console.log('Found R4 user from login, storing in session.', {user})
		this.set('session.data.currentUser', user)

		if (!shouldRedirect) return

		// See if the user has a channel to redirect to.
		const channels = await user.get('channels')
		const userChannel = channels.get('firstObject')
		if (userChannel) {
			console.log('redirecting to user channel')
			return this.replaceWith('channel', userChannel)
		}
		console.log('no user channel. lets create one')
		return this.replaceWith('channels.new')
	},

	// Returns a promise that resolves either a new user-setting or an already existing one.
	createUserSetting(user) {
		const hasSettings = user.belongsTo('settings').id();

		if (hasSettings) {
			console.log('user has settings');
			return RSVP.Promise.resolve(user.get('settings.firstObject'));
		}

		console.log('No user settings found, creating…');

		const userSetting = this.get('store').createRecord('user-setting', {user});

		return new RSVP.Promise(resolve => {
			userSetting.save().then(() => {
				user.set('settings', userSetting);
				user.save().then(() => {
					// debug('created new user settings');
					resolve(userSetting);
				});
			});
		});
	}
})
