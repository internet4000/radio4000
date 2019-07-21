import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {get} from '@ember/object'

// If there is no user or no channel, redirect to login,
// otherwise return the channel as model.

export default Route.extend(AuthenticatedRouteMixin, {
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
