import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		// @todo: if session.user already hasChannel redirect to his channel (so can't create >1 channel)

		// if not authenticated, redirect
		if (!this.get('session.authed')) {
			this.transitionTo('signin');
		}
	},
	model: function() {
		return this.store.createRecord('channel');
	},
	afterModel: function() {
		document.title = 'New - Radio4000';
	},
	deactivate: function() {
		document.title = 'Radio4000';
	}
});
