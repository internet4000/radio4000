import Ember from 'ember';

const {
	Controller,
	computed,
	inject,
	get,
	debug} = Ember;

export default Controller.extend({
	applicationController: inject.controller('application'),

	notExperienced: computed.not('model.isExperienced'),
	showWelcome: computed.and('notExperienced', 'model.canEdit'),

	actions: {
		addTrack(url) {
			debug(`Trying to add ${url}`);

			// Setting these properties open a modal in the application template.
			get(this, 'applicationController').setProperties({
				newUrl: url,
				showAddTrack: true
			});
		}
	}
});
