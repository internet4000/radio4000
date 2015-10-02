import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	uiStates: Ember.inject.service(),

	activate() {
		// enable minimal layout
		this.set('uiStates.isMinimal', true);
	},
	deactivate() {
		// remove minimal layout
		this.set('uiStates.isMinimal', false);
	},

	actions: {

		// Signs a user in and redirect to either her channel
		// or the form to create a channel
		logIn(authWith) {
			this.get('session').open('firebase', { authWith: authWith }).then(() => {
				const userChannels = this.get('session.currentUser.channels');

				userChannels.then((channels) => {
					let channel = channels.get('firstObject');

					if (channel) {
						debug('user signed in with channel, redirecting to it');
						this.transitionTo('channel', channel);
					} else {
						debug('user signed in without channel, redirecting to /new');
						this.transitionTo('channels.new');
					}
				});
			});
		}
	}
});
