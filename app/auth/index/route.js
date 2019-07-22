import Route from '@ember/routing/route';

const {get} = Ember;

export default Route.extend({
	beforeModel() {
		!get(this, 'session.isAuthenticated') && this.replaceWith('auth.login');
	},
});
