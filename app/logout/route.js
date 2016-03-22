import Ember from 'ember';

const {get} = Ember;

export default Ember.Route.extend({
	beforeModel() {
		const flashMessages = get(this, 'flashMessages');
		this.get('session').close().then(() => {
			flashMessages.warning('Your are logged out, Ciao!');
			this.transitionTo('application');
		});
	}
});
