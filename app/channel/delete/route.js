import Ember from 'ember';

export default Ember.Route.extend({
	// todo: this is repeated for channel/[add,edit,delete]
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		if (!authed) {
			Ember.debug('no authed --> signin');
			transition.abort();
			this.transitionTo('signin');
		}

		const userChannel = this.get('session.currentUser.channels.firstObject');
		if (!userChannel) {
			Ember.debug('no userChannel --> signin');
			transition.abort();
			this.transitionTo('signin');
		}

		const canEdit = userChannel.get('id') === this.modelFor('channel').get('id');
		if (!canEdit) {
			Ember.debug('no canEdit --> signin');
			transition.abort();
			this.transitionTo('signin');
		}
	},

	// don't render into channel because we don't want channel templates here
	renderTemplate() {
		this.render({
			into: 'application'
		});
	}
});
