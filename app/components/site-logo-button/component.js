import Ember from 'ember';

export default Ember.Component.extend({
	uiStates: Ember.inject.service(),
	classNames: ['Logo'],
	actions: {
		click() {
			this.get('uiStates').togglePanelLeft();
		}
	}
});
