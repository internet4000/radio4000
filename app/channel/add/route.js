import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		const userChannel = this.get('session.currentUser.channels.firstObject');
		const canEdit = (userChannel.get('id') === this.modelFor('channel').get('id'));

		if (!authed || !canEdit) {
			transition.abort();
			this.transitionTo('signin');
		}
	}
});
