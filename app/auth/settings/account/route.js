import Route from '@ember/routing/route';
import authenticatedRouteMixin from 'radio4000/mixins/authenticated-route';

export default Route.extend(authenticatedRouteMixin, {
	setupController() {
		this._super();
		this.controller.updateCurrentUser();
	},

	deactivate() {
		this._super();
		this.controller.resetCurrentUser();
	}
});
