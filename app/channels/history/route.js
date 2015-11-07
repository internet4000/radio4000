import Ember from 'ember';

const {inject} = Ember

export default Ember.Route.extend({
	userHistory: inject.service(),
	model() {
		return this.get('session.currentUser.settings').then(settings => {
			return settings.get('playedChannels');
		});
	},
	actions: {
		clearHistory() {
			this.get('userHistory').clearHistory();
		}
	}
});
