import Ember from 'ember';

const {Component, get, set} = Ember;

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
