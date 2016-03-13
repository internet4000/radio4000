import Ember from 'ember';
import MinimalRouteMixin from 'radio4000/mixins/minimal-route';

const {debug, get, set} = Ember;

export default Ember.Route.extend(MinimalRouteMixin, {
	uiStates: Ember.inject.service(),

	actions: {
		// Logs in a user
		// a) if the user has a channel, we transition to it
		// b) otherwise we transition to create a new channel
		login(provider) {
			const flashMessages = get(this, 'flashMessages');
			get(this, 'session').open('firebase', {provider}).then(() => {
				const userChannels = get(this, 'session.currentUser.channels');
				userChannels.then(channels => {
					const channel = get(channels, 'firstObject');
					if (channel) {
						debug('user signed in with channel, transitioning to it');
						flashMessages.info('You are logged in');
						this.transitionTo('channel', channel);
					} else {
						debug('user signed in without channel, transitioning to /new');
						this.transitionTo('channels.new');
					}
				});
			});
		}
	}
});
