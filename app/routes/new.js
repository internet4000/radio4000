import Ember from 'ember';

export default Ember.Route.extend({
	// route should abort if the session has a channel
	alreadyHasChannel: function() {
		Ember.debug(this.get('session.userChannel')); // ember model, this works
	}.observes('session.userChannel.@each'),

	beforeModel: function(model, transition) {
		// if not authenticated, redirect
		if (!this.get('session.authed')) {
			this.transitionTo('signin');
		}

		// TODO: abort if the user already has a channel
		// Ember.debug(this.get('userChannel'));
	},

	model: function() {
		return this.store.createRecord('channel');
	}
});
