import Ember from 'ember';

const {Route, get} = Ember;

// If there is no user or no channel, redirect to login,
// otherwise return the channel as model.

export default Route.extend({
	model() {
		const user = get(this, 'session.currentUser');
		if (!user) {
			this.transitionTo('login');
		}
		const userChannel = get(user, 'channels.firstObject');
		if (!userChannel) {
			this.transitionTo('login');
		}
		return userChannel;
	}
});
