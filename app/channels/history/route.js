import Ember from 'ember';

const {Route, inject, RSVP} = Ember;

export default Route.extend({
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	}
});
