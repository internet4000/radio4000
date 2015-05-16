import Ember from 'ember';

export default Ember.Route.extend({
	// beforeModel() {
	// 	if (this.get('session.isAuthenticated')) {
	// 		Ember.debug('already authed --> home');
	// 		this.transitionTo('application');
	// 	}
	// 	else {
	// 		Ember.debug('not authenticated');
	// 	}
	// },

	activate() {
		// set minimal ui style
		this.controllerFor('application').set('isMinimalUi', true);
		// prepares animation on action.login
		// this.controllerFor('application').set('isMinimalUiAnimation', false);
	},
	deactivate() {
		// remove minimal ui style
		this.controllerFor('application').set('isMinimalUi', false);
	},

	actions: {
		// Signs a user in and redirect to either her channel
		// or the form to create a channel
		logIn(authWith) {
			//
			this.send('animateUi');
			this.controllerFor('application').set('isMinimalUiAnimation', true);

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
		},

		animateUi() {
			this.controllerFor('application').set('isMinimalUiAnimation', true);
		}
	}
});
