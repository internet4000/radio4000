import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Component, computed, get} = Ember;

export default Component.extend({
	isExpanded: false,
	// firebaseApp service
	// user: null
	channel: computed.alias('user.channels.firstObject'),

	deleteAccount: task(function * () {
		let user = get(this, 'user');
		let settings = yield user.get('settings');
		let firebaseUser = get(this, 'firebaseApp').auth().currentUser;

		try {
			yield settings.destroyRecord();
			user.set('settings', null);
			yield user.save();
			yield user.destroyRecord();
			yield firebaseUser.delete();
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
