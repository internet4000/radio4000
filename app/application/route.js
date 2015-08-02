import Ember from 'ember';
import goBackMixin from 'radio4000/mixins/go-back';

export default Ember.Route.extend(goBackMixin, {
	beforeModel: function() {

		// refresh (fetch) any cached user session
		return this.get('session').fetch().then(() => {
			// debug('user logged in (passively');
		}, () => {
			// debug('no user');
		});
	},

	actions: {
		logout() {
			this.get('session').close().then(() => {
				this.transitionTo('application');
			});
		}
	}
});
