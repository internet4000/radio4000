import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	// beforeModel() {
	// 	if (this.get('session.isAuthenticated')) {
	// 		debug('already authed --> home');
	// 		this.transitionTo('application');
	// 	}
	// 	else {
	// 		debug('not authenticated');
	// 	}
	// },

	activate() {
		// set minimal ui style and prepares animation on action.login
		this.controllerFor('application').setProperties({
			isMinimalUi: true
		});
	},
	deactivate() {
		// remove minimal ui style and animation
		this.controllerFor('application').setProperties({
			isMinimalUi: false
		});
	},

	actions: {
		// Signs a user in and redirect to either her channel
		// or the form to create a channel
		logIn(authWith) {
			//
			this.send('animateUi');
			this.controllerFor('application').set('isMinimalUi', true);

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
		},

		animateUi() {
			this.controllerFor('application').set('isMinimalUiAnimation', true);
		}
	}
});
