import Ember from 'ember';

const {Component, inject} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	classNames: ['Logo'],
	click() {
		this.get('uiStates').togglePanelLeft();
	}
});
