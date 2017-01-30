import Ember from 'ember';
import authenticatedRouteMixin from 'radio4000/mixins/authenticated-route';

const {Route} = Ember;

export default Route.extend(authenticatedRouteMixin, {
	deactivate() {
		this._super();
		this.controller.resetCurrentUser();
	}
});
