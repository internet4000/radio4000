import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	beforeModel() {
		if (!this.get('session.isAuthenticated')) {
			this.transitionTo('auth.login');
		}
		this._super();
	}
});
