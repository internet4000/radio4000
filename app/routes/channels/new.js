import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		if (!this.get('session.authed')) {
			// redirect if you're not authed
			this.transitionTo('signin');
		} else if (this.get('session.userChannel')) {
			// or already have a channel
			this.transitionTo('channel', this.get('session.userChannel'));
		}
	},
	model() {
		return this.store.createRecord('channel');
	},
	afterModel() {
		document.title = 'New - Radio4000';
	},
	renderTemplate() {
		// don't render into channels outlet - this avoids the tabs we have on channels.hbs
		this.render({
			into: 'application'
		});
	},
	deactivate() {
		document.title = 'Radio4000';
	},

	// redirect to sign in
	onLogout: Ember.observer('session.authed', function() {
		if (!this.get('session.authed')) {
			this.transitionTo('signin');
		}
	}),

	actions: {
		willTransition(transition) {
			// stop the transition if you haven't got a channel
			if (this.get('session.authed') && !this.get('session.userChannel')) {
				transition.abort();
			}
		}
	}
});
