import Ember from 'ember';

const {debug, get} = Ember;

export default Ember.Route.extend({
	uiStates: Ember.inject.service(),

	activate() {
		this.set('uiStates.isMinimal', true);
	},
	deactivate() {
		this.set('uiStates.isMinimal', false);
	},

	actions: {
		// Signs a user in.
		// And if the user has a channel we transition to it,
		// otherwise we transition to create a new channel.
		logIn(authWith) {
			const flashMessages = get(this, 'flashMessages');
			this.get('session').open('firebase', {authWith: authWith}).then(() => {
				const userChannels = this.get('session.currentUser.channels');
				userChannels.then(channels => {
					const channel = channels.get('firstObject');
					if (channel) {
						debug('user signed in with channel, transitioning to it');
						flashMessages.info('You are logged in!');
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
