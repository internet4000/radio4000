import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		this.get('session').fetch().catch(function() {
			Ember.debug('when is this called');
		});
	},

	renderTemplate() {

		// because we overwrite the renderTemplate method
		// we need to run super
		this._super();

		// and update nav bar
		this.render('contextual-navigation/cn-channels', {
			into: 'application',
			outlet: 'contextual-navigation'
		});
	},

	actions: {
		signIn(authWith) {
			this.get('session').open('firebase', { authWith: authWith }).then(() => {
				var userChannel = this.get('session.currentUser.channels');

				Ember.debug('logged in!');

				// if the user doesn't have a channel, incite him to create one
				if (userChannel) {
					// this.transitionTo('channel', userChannel);
				} else {
					this.transitionTo('channels.new');
				}
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
