import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
	beforeModel(transition) {
		if (get(this, 'session.isAuthenticated')) {
			return transition.send('redirectAfterAuth');
		}
	},
	actions: {
		redirectAfterAuth() {
			return true;
		}
	}
});
