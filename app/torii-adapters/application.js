import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

const {debug, inject, RSVP} = Ember;

export default ToriiFirebaseAdapter.extend({
	store: inject.service(),
	flashMessages: inject.service(),
	// firebase: inject.service(),

	// Extacts session information from authentication response
	open(user) {
		this._super(user);
		const store = this.get('store');
		let providerIsPassword = this.extractProviderId_(user) === 'password';

		return new RSVP.Promise((resolve, reject) => {
			// TODO: make this check only for email logins
			if (!user.emailVerified && providerIsPassword) {
				debug('Email is not verified, sending email');
				user.sendEmailVerification();
				this.close();
				reject(new Error('We just sent your an email to verify your email adress'));
			} else {
				this.getOrCreateUser(user.uid, store).then(userModel => {
					this.createUserSetting(userModel, store);
					resolve({
						provider: this.extractProviderId_(user),
						uid: user.uid,
						// Note that normally currentUser is a Firebase user, not an ember model `user` like in this case.
						currentUser: userModel
					});
				});
			}
		});
	},

	// Returns a promise that resolves to either a new user or an already existing one.
	getOrCreateUser(id, store) {
		if (!id) {
			throw new Error('Missing `id` argument');
		}
		if (!store) {
			throw new Error('Missing `store` argument');
		}
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
	createUserSetting(user, store) {
		if (!user) {
			throw new Error('Missing `user` argument');
		}

		const alreadyHaveASetting = user.belongsTo('settings').id();
		if (alreadyHaveASetting) {
			return RSVP.Promise.resolve(user.get('settings.firstObject'));
		}

		debug('No user settings found, creating…');
		const userSetting = store.createRecord('user-setting', {user});
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
