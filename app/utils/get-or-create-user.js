import Ember from 'ember';

const {debug, RSVP} = Ember;

// Returns a promise that resolves to either a new user or an already existing one.
export function getOrCreateUser(id, store) {
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
}

// Returns a promise that resolves either a new user-setting or an already existing one.
export function createUserSetting(user, store) {
	if (!user) {
		throw new Error('Missing `user` argument');
	}

	const alreadyHaveASetting = user.belongsTo('settings').id();
	if (alreadyHaveASetting) {
		debug('Can not create user setting. Already exists.');
		return RSVP.Promise.resolve(user.get('settings.firstObject'));
	}

	debug('Creating new user-setting');
	const userSetting = store.createRecord('user-setting', {user});
	return new RSVP.Promise(resolve => {
		userSetting.save().then(() => {
			user.set('settings', userSetting);
			user.save().then(() => {
				debug('saved new user setting on user');
				resolve(userSetting);
			});
		});
	});
}
