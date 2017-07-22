import Ember from 'ember';

const {Component, inject, computed, get} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	attributeBindings: ['title'],
	classNames: ['Aside-toggle'],
	classNameBindings: ['isToggled:is-active'],
	title: computed('isToggled', function () {
		if (get(this, 'isToggled')) {
			return 'Close the navigation menu';
		}
		return 'Open the navigation menu';
	}),
	isToggled: computed.oneWay('uiStates.isPanelLeftVisible'),
	click() {
		get(this, 'uiStates').togglePanelLeft();
	},
	html: '<'
});
