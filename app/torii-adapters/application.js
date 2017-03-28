import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

const {debug, inject, RSVP} = Ember;

export default ToriiFirebaseAdapter.extend({
	store: inject.service(),

	// Extacts session information from authentication response
	open(user) {
		this._super(user);
		let provider = this.extractProviderId_(user);
		let providerIsPassword = (provider === 'password');

		// reject login and send email is loging with email && not verified
		return new RSVP.Promise((resolve, reject) => {
			if (!user.emailVerified && providerIsPassword) {
				let err = {
					code: 'auth/email-not-verified',
					message: 'Before you can log in, first verify your email address. Check your inbox.'
				};
				debug(err);
				user.sendEmailVerification();
				this.close();
				reject(err);
				return;
			}

			// resolve on sucess
			this.getOrCreateUser(user.uid).then(userModel => {
				this.createUserSetting(userModel);
				resolve({
					uid: user.uid,
					// Note that normally currentUser is a Firebase user,
					// not an ember model `user` like in this case.
					currentUser: userModel
				});
			});
		});
	},

	// Returns a promise that resolves to either a new user or an already existing one.
	getOrCreateUser(id) {
		if (!id) {
			throw new Error('Missing `id` argument');
		}
		const store = this.get('store');
		return new RSVP.Promise(resolve => {
			store.findRecord('user', id).then(user => {
				resolve(user);
			}).catch(error => {
				debug(error);
				const newUser = store.createRecord('user', {id});
				newUser.save().then(() => {
					resolve(newUser);
				});
			});
		});
	},

	// Returns a promise that resolves either a new user-setting or an already existing one.
	createUserSetting(user) {
		if (!user) {
			throw new Error('Missing `user` argument');
		}
		const hasSettings = user.belongsTo('settings').id();
		if (hasSettings) {
			return RSVP.Promise.resolve(user.get('settings.firstObject'));
		}

		debug('No user settings found, creating…');
		const userSetting = this.get('store').createRecord('user-setting', {user});
		return new RSVP.Promise(resolve => {
			userSetting.save().then(() => {
				user.set('settings', userSetting);
				user.save().then(() => {
					debug('created new user settings');
					resolve(userSetting);
				});
			});
		});
	}
});
