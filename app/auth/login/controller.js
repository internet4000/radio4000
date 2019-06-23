import Controller from '@ember/controller'

export default Controller.extend({
	actions: {
		// This does nothing else but route the action
		// up to a "login" action on the parent `auth` route.
		submitLogin(...args) {
			this.send('login', args)
		}
	}
})
