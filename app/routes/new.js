import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(model, transition) {
		// if not authenticated, redirect
		if (!this.get('session.authed')) {
			this.transitionTo('signin');
		}
	},

	model: function() {
		return this.store.createRecord('channel');
	}

	// route should abort if the session has a channel
	// TODO THIS RUNS EVEN IF YOU're not on the /new route
	// onUserChannel: function() {
	// 	var channel = this.get('session.userChannel');
	// 	if (channel) {
	// 		alert('You already have a channel. Embrace the simple life.');
	// 		this.transitionTo('channel', channel);
	// 	}
	// }.observes('session.userChannel.[]')
});
