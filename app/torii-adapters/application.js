import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import {getOrCreateUser, createUserSetting} from 'radio4000/utils/get-or-create-user';

const {inject, RSVP} = Ember;

export default ToriiFirebaseAdapter.extend({
    store: inject.service(),
    // firebase: inject.service(),

    /**
     * Extacts session information from authentication response
     *
     * @param {!firebase.User} user
     * @return {Promise}
     */
	open(user) {
		this._super(user);
		const store = this.get('store');
		return new RSVP.Promise(resolve => {
			getOrCreateUser(user.uid, store).then(userModel => {
				createUserSetting(userModel, store);
				resolve({
					provider: this.extractProviderId_(user),
					uid: user.uid,
					// currentUser: user
					// the above three props are defaults, below is custom
					currentUser: userModel
				});
			});
		});
	}
});
