import Ember from 'ember';

const {Route, inject, RSVP} = Ember;

export default Route.extend({
	playerHistory: inject.service(),
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	},
	actions: {
		clearChannelHistory() {
			this.get('playerHistory').clearChannelHistory();
		}
	}
});
