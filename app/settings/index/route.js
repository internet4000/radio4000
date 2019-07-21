import Route from '@ember/routing/route'

export default Route.extend({
	redirect() {
		const channel = this.get('session.currentUser.channels.firstObject')
		const defaultRoute = channel ? 'settings.channel' : 'settings.account'
		this.transitionTo(defaultRoute)
	}
})
