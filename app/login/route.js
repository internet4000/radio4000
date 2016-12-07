import Ember from 'ember';

const {Route, get, inject} = Ember;

export default Route.extend({
	uiStates: inject.service(),

	beforeModel() {
		if (get(this, 'session.isAuthenticated')) {
			return this.redirectIfAuthenticated();
		}
	},

	redirectIfAuthenticated() {
		return get(this, 'session.currentUser.channels').then(channels => {
			const userChannel = get(channels, 'firstObject');
			if (userChannel) {
				return this.transitionTo('channel', userChannel);
			}
			return this.transitionTo('channels.new');
		});
	}
});
