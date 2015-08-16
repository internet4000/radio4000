import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	// todo: this is repeated for channel/[add,edit,delete]
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		if (!authed) {
			debug('not authed - transitioning to log in');
			transition.abort();
			this.transitionTo('login');
		}

		const userChannel = this.get('session.currentUser.channels.firstObject');
		if (!userChannel) {
			debug('no channel - transitioning to log in');
			transition.abort();
			this.transitionTo('login');
		}

		const canEdit = userChannel.get('id') === this.modelFor('channel').get('id');
		if (!canEdit) {
			debug('cant edit - transitioning to log in');
			this.transitionTo('login');
		}
	},
	
	// clear any unsaved changes
	deactivate() {
		this.get('currentModel').rollbackAttributes();
	}
});
