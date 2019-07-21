import Route from '@ember/routing/route'
import {inject as service} from '@ember/service'

export default Route.extend({
	session: service(),

	beforeModel(transition) {
		if (this.session.get('isAuthenticated')) {
			return transition.send('redirectAfterAuth')
		}
	},
	actions: {
		login() {
			return true
		},
		redirectAfterAuth() {
			return true
		}
	}
})
