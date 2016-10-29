import Ember from 'ember';
// import MinimalRouteMixin from 'radio4000/mixins/minimal-route';

const {get} = Ember;

export default Ember.Route.extend({
	uiStates: Ember.inject.service(),

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
	},

	actions: {
		// Logs in a user. Provider has to match what we've enabled in Firebase authentication. That is 'google' or 'facebook'.
		// a) if the user has a channel, we transition to it
		// b) otherwise we transition to create a new channel
		login(provider) {
			const flashMessages = get(this, 'flashMessages');
			get(this, 'session').open('firebase', {provider}).then(() => {
				flashMessages.info('You have been signed in');
				this.redirectIfAuthenticated();
			}).catch(err => {
				console.log(err);
			});
		}
	}
});
