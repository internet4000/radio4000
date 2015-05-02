import Ember from 'ember';

export default Ember.Route.extend({
	// todo: this is repeated for channel/[add,edit,delete]
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		if (!authed) {
			transition.abort();
			this.transitionTo('signin');
		}

		const userChannel = this.get('session.currentUser.channels.firstObject');
		if (!userChannel) {
			transition.abort();
			this.transitionTo('signin');
		}

		const canEdit = userChannel.get('id') === this.modelFor('channel').get('id');
		if (!canEdit) {
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
