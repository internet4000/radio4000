import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	// props
	channel: null,

	actions: {
		updateDetails(details) {
			get(this, 'updateDetails')(details)
		}
	}
});
