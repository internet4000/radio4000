import Route from '@ember/routing/route'

// This route only exists because ember-simple-auth expects it.
// Our own login route is at auth.login.

export default Route.extend({
	beforeModel() {
		this.replaceWith('auth.login')
	}
})
