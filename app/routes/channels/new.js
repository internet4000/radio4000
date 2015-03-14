import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (!this.get('session.authed')) {
			// redirect if you're not authed
			this.transitionTo('signin');
		} else if (this.get('session.userChannel')) {
			// or already have a channel
			this.transitionTo('channel', this.get('session.userChannel'));
		}
	},
	model: function() {
		return this.store.createRecord('channel');
	},
	afterModel: function() {
		document.title = 'New - Radio4000';
	},
	renderTemplate: function() {
		// don't render into channels outlet - this avoids the tabs we have on channels.hbs
		this.render({
			into: 'application'
		});
	},
	deactivate: function() {
		document.title = 'Radio4000';
	},
	actions: {
		willTransition: function(transition) {
			// stop the transition if you haven't got a channel
			if (this.get('session.authed') && !this.get('session.userChannel')) {
				transition.abort();
			}
		}
	},

	// redirect to sign in
	onLogout: function() {
		if (!this.get('session.authed')) {
			this.transitionTo('signin');
		}
	}.observes('session.authed')
});
