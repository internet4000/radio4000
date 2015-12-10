import Ember from 'ember';

const {inject, RSVP} = Ember;

export default Ember.Route.extend({
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
