import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';

export const Validations = buildValidations({
	url: [
		validator('youtube-url')
	]
});

const {Component, get, set} = Ember;

export default Component.extend(Validations, {
	tagName: 'form',
	classNames: ['Form', 'Form--addTrack'],
	url: null,

	submit(event) {
		if (event) {
			event.preventDefault();
		}
		get(this, 'onSubmit')(get(this, 'url'));
		set(this, 'url', '');
	},

	actions: {
		paste() {
			this.submit();
		}
	}
});
