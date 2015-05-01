import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		this.get('session').fetch().catch(function() {
			// Ember.debug('when is this called');
		});
	},

	// renderTemplate() {
	// 	// because we overwrite the renderTemplate method
	// 	// we need to run super
	// 	this._super();

	// 	// and update nav bar
	// 	this.render('contextual-navigation/cn-channels', {
	// 		into: 'application',
	// 		outlet: 'contextual-navigation'
	// 	});
	// },

	actions: {
		// Signs a user in and redirect to either her channel
		// or the form to create a channel
		signIn(authWith) {
			this.get('session').open('firebase', { authWith: authWith }).then(() => {
				const userChannels = this.get('session.currentUser.channels');

				userChannels.then((channels) => {
					let channel = channels.get('firstObject');

					if (channel) {
						this.transitionTo('channel', channel);
					} else {
						this.transitionTo('channels.new');
					}
				});
			});
		},
		logout() {
			this.get('session').close();
		},
		back() {
			window.history.back();
		}
	}
});
