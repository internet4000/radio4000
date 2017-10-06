import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get } from '@ember/object';
import { debug } from '@ember/debug';
import { task } from 'ember-concurrency';

export default Component.extend({
	flashMessages: service(),
	isExpanded: false,
	// firebaseApp service
	// user: null
	channel: alias('user.channels.firstObject'),

	deleteAccount: task(function * () {
		const messages = get(this, 'flashMessages');
		let user = get(this, 'user');
		let settings = yield user.get('settings');
		let firebaseUser = get(this, 'firebaseApp').auth().currentUser;

		try {
			yield settings.destroyRecord();
			debug('r4 userSettings destroyed');
			user.set('settings', null);
			yield user.save();
			yield user.destroyRecord();
			debug('r4 user destroyed');
			yield firebaseUser.delete();
			debug('firebase user destroyed');
			get(this, 'onDelete')();
		} catch (error) {
			if (error.code === 'auth/requires-recent-login') {
				messages.warning(`For your security, please log in again before deleting your account.`, {
					sticky: true
				});
			}
			debug(error);
		}
	}),

	actions: {
		toggle() {
			this.toggleProperty('isExpanded');
		},
		delete() {
			get(this, 'deleteAccount').perform();
		}
	}
});
