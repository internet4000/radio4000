import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	// todo: this is repeated for channel/[add,edit,delete]
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		if (!authed) {
			debug('no authed --> channel');
			transition.abort();
			this.transitionTo('login');
		}

		const userChannel = this.get('session.currentUser.channels.firstObject');
		if (!userChannel) {
			debug('no userChannel --> channel');
			transition.abort();
			this.transitionTo('login');
		}

		const canEdit = userChannel.get('id') === this.modelFor('channel').get('id');
		if (!canEdit) {
			debug('no canEdit --> channel');
			transition.abort();
			this.transitionTo('login');
		}
	},

	// don't render into channel because we don't want channel templates here
	renderTemplate: function() {
		this.render({
			into: 'application'
		});
	},

	// clear any unsaved changes
	deactivate() {
		this.modelFor('channel').rollback();
	}
});
