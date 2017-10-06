import { not, and } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
	applicationController: controller('application'),

	notExperienced: not('model.channel.isExperienced'),
	showWelcome: and('notExperienced', 'model.channel.canEdit'),

	actions: {
		addTrack(url) {
			// Setting these properties open a modal in the application template.
			get(this, 'applicationController').setProperties({
				newUrl: url,
				showAddTrack: true
			});
		}
	}
});
