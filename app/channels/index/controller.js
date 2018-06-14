import Controller from '@ember/controller';
import {computed} from '@ember/object'

export default Controller.extend({
	filteredModel: computed.filterBy('model', 'coverImage'),

	actions: {
		refreshSelection() {
			return true
		}
	}
});
