import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Component,
			 computed,
			 get,
			 debug} = Ember;

export default Component.extend({
	isExpanded: false,
	// firebaseApp service
	// user: null
	channel: computed.alias('user.channels.firstObject'),

	deleteAccount: task(function * () {
		let user = get(this, 'user');
		let settings = yield user.get('settings');
		let firebaseUser = get(this, 'firebaseApp').auth().currentUser;

		console.log('firebaseUser', firebaseUser)

		try {
			yield settings.destroyRecord();
			debug('r4 userSettings destroyed');
			user.set('settings', null);
			yield user.save();
			yield user.destroyRecord();
			debug('r4 user destroyed');
			yield firebaseUser.delete();
			debug('firabse user destroyed');
		} catch (err) {
			this.attrs.onError(err);
		}
	}),

	actions: {
		toggle() {
			this.toggleProperty('isExpanded');
		},
		delete() {
			this.get('deleteAccount').perform()
				.then(this.attrs.onDelete);
		}
	}
});
