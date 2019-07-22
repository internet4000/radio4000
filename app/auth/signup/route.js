import Ember from 'ember';
import {get} from '@ember/object'

export default Ember.Route.extend({
	beforeModel(transition) {
		if (get(this, 'session.isAuthenticated')) {
			return transition.send('redirectAfterAuth')
		}
	}
});
