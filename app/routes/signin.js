import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {

		// if already authenticated, redirect to intro
		if (this.get('session.isAuthenticated')) {
			this.transitionTo('intro');
		}
	}

	// userChanged: Ember.observer('session.currentUser.id', function() {
	// 	let authed = this.get('session.isAuthenticated');
	// 	let userChannels = this.get('session.currentUser');

	// 	// Ember.debug('authed: ' + authed);
	// 	// Ember.debug('channel: ' + userChannel);

	// 	if (!authed) {
	// 		return;
	// 	}



	// 	userChannels.then((channels) => {
	// 		let channel = channels.get('firstObject');
	// 		Ember.debug('userchannel:');
	// 		Ember.debug(channel);

	// 		if (authed && channel) {
	// 			Ember.debug('authed with channel');

	// 			// but we can't transition here because the user
	// 			// might not have actively authenticated in

	// 		} else if (authed && !channel) {
	// 			Ember.debug('authed without channel');
	// 			this.transitionTo('channels.new');
	// 		}
	// 	});
	// })
});
