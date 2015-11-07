import Ember from 'ember';

const {Service, inject, debug} = Ember;

export default Service.extend({
	session: inject.service(),
	store: inject.service(),

	historyManager(playlist) {
		this.get('session.currentUser.settings').then(settings => {
			settings.get('channelsHistory').then(history => {
				console.log(history);
				history.addObject(playlist);
			})
		})
	}
});
