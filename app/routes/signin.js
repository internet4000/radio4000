import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		if (this.get('session.isAuthenticated')) {
			this.transitionTo('intro');
		}
	},

	userChanged: Ember.observer('session.currentUser.id', function() {
		let authed = this.get('session.isAuthenticated');
		let userChannel = this.get('session.currentUser.channels.firstObject');

		// Ember.debug('authed: ' + authed);
		// Ember.debug('channel: ' + userChannel);

		if (authed && userChannel) {
			Ember.debug('authed with channel');

			// but we can't transition here because the user
			// might not have actively authenticated in

		} else if (authed && !userChannel) {
			Ember.debug('authed without channel');
			this.transitionTo('channels.new');

		} else if (!authed) {
			Ember.debug('not authed');
			// this.transitionTo('/');
		}
	})
});
