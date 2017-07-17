import Ember from 'ember';

const {Component, inject, computed} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	attributeBindings: ['title'],
	classNames: ['Aside-toggle'],
	classNameBindings: ['isToggled:is-active'],
	title: 'Toggle the visibility of the navigation menu',
	isToggled: computed.oneWay('uiStates.isPanelLeftVisible'),
	click() {
		this.get('uiStates').togglePanelLeft();
	},
	html: '<'
});
