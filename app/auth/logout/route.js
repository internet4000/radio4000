import Route from '@ember/routing/route'
import {inject as service} from '@ember/service'
import {get} from '@ember/object'
import authenticatedRoute from 'radio4000/mixins/authenticated-route';

export default Route.extend(authenticatedRoute, {
	session: service(),

	afterModel() {
		const flashMessages = get(this, 'flashMessages');

		// // If we do not unload the user model, Firebase will warn about permissions.
		// let user = get(this, 'session.currentUser');
		// get(user, 'settings').then(s => {
		// 	if (s) {
		// 		s.unloadRecord();
		// 	}
		// });
		// user.unloadRecord();

		this.session.invalidate().then(() => {
			flashMessages.success(`You have been signed out`);
			this.replaceWith('auth.login');
		});
	}
});
