import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import {getOrCreateUser, createUserSetting} from 'radio4000/utils/get-or-create-user';

const {inject, RSVP} = Ember;

export default ToriiFirebaseAdapter.extend({
	store: inject.service(),
	// firebase: inject.service(),

	// Extacts session information from authentication response
	open(user) {
		this._super(user);
		const store = this.get('store');

		return new RSVP.Promise(resolve => {
			getOrCreateUser(user.uid, store).then(userModel => {
				createUserSetting(userModel, store);
				resolve({
					provider: this.extractProviderId_(user),
					uid: user.uid,
					// Note that normally currentUser is a Firebase user, not an ember model `user` like in this case.
					currentUser: userModel
				});
			});
		});
	}
});
