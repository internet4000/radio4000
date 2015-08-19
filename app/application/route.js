import Ember from 'ember';

export default Ember.Route.extend({

	// refresh (fetch) any cached user session
	beforeModel() {
		return this.get('session').fetch().then(() => {
			// debug('user logged in (passively');
		}, () => {
			// debug('no user');
		});
	}
});
