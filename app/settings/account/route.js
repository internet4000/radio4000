import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Route.extend(AuthenticatedRouteMixin, {
	setupController() {
		this._super()
		this.controller.updateCurrentUser()
	},

	deactivate() {
		this._super()
		this.controller.resetCurrentUser()
	}
})
