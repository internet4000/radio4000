import Ember from 'ember';
import authenticatedRoute from 'radio4000/mixins/authenticated-route';

const {get} = Ember;

export default Ember.Route.extend(authenticatedRoute, {
	afterModel() {
		const flashMessages = get(this, 'flashMessages');

		// If we do not unload the user model, Firebase will warn about permissions.
		let user = get(this, 'session.currentUser');
		get(user, 'settings').then(s => {
			if (s) {
				s.unloadRecord();
			}
		});
		user.unloadRecord();

		get(this, 'session').close().then(() => {
			flashMessages.success(`You have been signed out`);
			this.replaceWith('auth.login');
		});
	}
});
