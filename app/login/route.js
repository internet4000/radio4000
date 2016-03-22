import Ember from 'ember';
import MinimalRouteMixin from 'radio4000/mixins/minimal-route';

const {get} = Ember;

export default Ember.Route.extend(MinimalRouteMixin, {
	uiStates: Ember.inject.service(),

	afterLogin() {
		return get(this, 'session.currentUser.channels').then(channels => {
			const channel = get(channels, 'firstObject');
			if (channel) {
				return this.transitionTo('channel', channel);
			}
			return this.transitionTo('channels.new');
		});
	},

	actions: {
		// Logs in a user
		// a) if the user has a channel, we transition to it
		// b) otherwise we transition to create a new channel
		login(provider) {
			const flashMessages = get(this, 'flashMessages');
			get(this, 'session').open('firebase', {provider}).then(() => {
				flashMessages.info('You are logged in');
				this.afterLogin();
			});
		}
	}
});
