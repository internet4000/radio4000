import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
	showInputs: false,
	actions: {
		link(email, password) {
			if (!get(this, 'showInputs')) {
				set(this, 'showInputs', true);
				return;
			}
			get(this, 'onLink')(email, password);
		}
	}
});
