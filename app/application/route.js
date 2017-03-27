import Ember from 'ember';

const {Route, debug} = Ember;

export default Route.extend({
	actions: {
		accessDenied(err) {
			this.transitionTo('auth.login');
			if (err) {
				debug(err);
			}
		}
	}
});
