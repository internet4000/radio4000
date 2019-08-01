import Ember from 'ember';
import Route from '@ember/routing/route';

const { inject, get } = Ember;

export default Route.extend({
	uiStates: inject.service(),

	renderTemplate: function() {
		this.render({
			into: 'application'
		});
	},

	activate() {
		get(this, 'uiStates').toggleDockedFormat()
	},
	deactivate() {
		if (get(this, 'uiStates.isDocked')) {
			get(this, 'uiStates').toggleNormalFormat()
		}
	}
});
