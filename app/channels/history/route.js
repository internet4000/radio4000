import Ember from 'ember';

const {inject, RSVP} = Ember;

export default Ember.Route.extend({
	userHistory: inject.service(),
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	},
	actions: {
		clearHistory() {
			this.get('userHistory').clearHistory();
		}
	}
});
