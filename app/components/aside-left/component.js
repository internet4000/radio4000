import Ember from 'ember';

const {Component, computed, get, inject} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	tagName: 'aside',
	classNames: ['Aside', 'Aside--left'],

	isActive: computed.alias('uiStates.isPanelLeftVisible'),

	actions: {
		addTrack() {
			get(this, 'toggleModal')();
		}
	}
});
