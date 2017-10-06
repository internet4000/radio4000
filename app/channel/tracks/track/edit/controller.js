import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({

	actions: {
		cancelAndBack() {
			get(this, 'model').rollbackAttributes()
			this.send('goBack')
		},
		goBack() {
			this.transitionToRoute('channel.tracks')
		}
	}
});
