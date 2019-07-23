import Ember from 'ember'
import Route from '@ember/routing/route'
const {get} = Ember

export default Route.extend({
	beforeModel() {
		return !get(this, 'session.isAuthenticated') && this.replaceWith('auth.login')
	}
});
