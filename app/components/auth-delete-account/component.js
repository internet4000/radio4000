import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Component, computed, get} = Ember;

export default Component.extend({
	isExpanded: false,
	// user: null
	channel: computed.alias('user.channels.firstObject'),

	deleteUser: task(function * () {
		let user = get(this, 'user');
		try {
			yield user.destroyRecord();
			console.log('deleted R4 user');
		} catch (err) {
			console.log('could not delete r4 user');
		}
	}),
	deleteFirebaseUser: task(function * () {
		let user = get(this, 'firebaseApp').auth().currentUser;

		try {
			yield user.delete()
			// User deleted.
			console.log('deleted firebase user');
		} catch (err) {
			// console.log('could not delete user');
			this.attrs.onError(err);
		}
	}),

	actions: {
		toggle() {
			this.toggleProperty('isExpanded');
		},
		delete() {
			// this.get('deleteUser').perform();
			// this.get('deleteFirebaseUser').perform();
		}
	}
});
