import Ember from 'ember';
import authenticatedRoute from 'radio4000/mixins/authenticated-route';

const {Route, get} = Ember;

// If there is no user or no channel, redirect to login,
// otherwise return the channel as model.

export default Route.extend(authenticatedRoute, {
	model() {
		const user = get(this, 'session.currentUser');
		if (!user) {
			this.transitionTo('auth.login');
		}
		const userChannel = get(user, 'channels.firstObject');
		if (!userChannel) {
			this.transitionTo('auth.login');
		}
		return userChannel;
	}
});
