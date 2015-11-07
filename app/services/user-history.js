import Ember from 'ember';

const {Service, inject, debug} = Ember;

export default Service.extend({
	session: inject.service(),
	store: inject.service(),

	historyManager(playlist) {
		Ember.debug('a playlist was passed to historyManager');
		this.get('session.currentUser.settings').then(settings => {
			settings.get('channelsHistory').then(history => {
				history.addObject(playlist);
				settings.save().then(() => {
					Ember.debug('playlist was saved to currentUser.settings.channelsHistory');
				});
			});
		});
	}
});
