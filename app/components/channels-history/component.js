import { inject as service } from '@ember/service';
import { empty } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
	player: service(),
	items: null,
	noHistory: empty('items'),
	actions: {
		clearChannelHistory() {
			this.get('player').clearChannelHistory();
		}
	}
});
