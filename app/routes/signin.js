import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		if (this.get('session.isAuthenticated')) {
			Ember.debug('not authed --> home');
			this.transitionTo('application');
		}
	},

	activate() {
		this.controllerFor('application').set('isOnSignIn', true);
	},
	deactivate() {
		this.controllerFor('application').set('isOnSignIn', false);
	},

	actions: {
		// Signs a user in and redirect to either her channel
		// or the form to create a channel
		signIn(authWith) {
			this.get('session').open('firebase', { authWith: authWith }).then(() => {
				const userChannels = this.get('session.currentUser.channels');

				userChannels.then((channels) => {
					let channel = channels.get('firstObject');

					if (channel) {
						Ember.debug('user signed in with channel, redirecting to it');
						this.transitionTo('channel', channel);
					} else {
						Ember.debug('user signed in without channel, redirecting to /new');
						this.transitionTo('channels.new');
					}
				});
			});
		}
	}
});
