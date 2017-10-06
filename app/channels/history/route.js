import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import authenticatedRoute from 'radio4000/mixins/authenticated-route'

export default Route.extend(authenticatedRoute, {
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	}
});
