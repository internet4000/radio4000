import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';

export const Validations = buildValidations({
	addTrackUrl: [
		validator('youtube-url')
	]
});

const {Component, get} = Ember;

export default Component.extend(Validations, {
	tagName: 'form',
	classNames: ['Form', 'Form--addTrack'],
	addTrackUrl: null,

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
