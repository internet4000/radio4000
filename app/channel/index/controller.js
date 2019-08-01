import Ember from 'ember';

const {
	Controller,
	computed,
	inject,
	get
} = Ember;

export default Controller.extend({
	applicationController: inject.controller('application'),
	uiStates: inject.service(),
	player: inject.service(),

	notExperienced: computed.not('model.channel.isExperienced'),
	showWelcome: computed.and('notExperienced', 'model.channel.canEdit'),

	actions: {
		addTrack(url) {
			// Setting these properties open a modal in the application template.
			get(this, 'applicationController').setProperties({
				newUrl: url,
				showAddTrack: true
			});
		},
		toggleDockedFormat() {
			get(this, 'uiStates').toggleDockedFormat();
		}
	}
});
