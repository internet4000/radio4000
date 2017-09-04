import Ember from 'ember';
import authenticatedRoute from 'radio4000/mixins/authenticated-route'

const {Route, RSVP} = Ember;

export default Route.extend(authenticatedRoute, {
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	}
});
