import Ember from 'ember';

const {RSVP} = Ember;

export function createUserSetting(user, store) {
	if (!user) {
		throw new Error('Missing `user` argument');
	}
	if (user.get('settings').length) {
		console.log('Can not create user setting. Already exists.');
		return RSVP.Promise.resolve(user.get('settings.firstObject'));
	}
	const userSetting = store.createRecord('user-setting', {user});
	return new RSVP.Promise(resolve => {
		userSetting.save().then(() => {
			user.set('settings', userSetting);
			user.save().then(() => resolve(userSetting));
		});
	});
}

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
			console.log(error);
			const newUser = store.createRecord('user', {id});
			newUser.save().then(() => {
				resolve(newUser);
			});
		});
	});
}
