import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	}
});
