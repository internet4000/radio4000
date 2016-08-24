import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	tagName: 'form',
	classNames: ['Form', 'Form--addTrack'],

	submit(event) {
		if (event) {
			event.preventDefault();
		}
		const url = get(this, 'addTrackUrl');
		get(this, 'onSubmit')(url);
	},

	actions: {
		paste() {
			this.submit();
		}
	}
});
