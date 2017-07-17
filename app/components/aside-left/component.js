import Ember from 'ember';

const {Component, computed, get, inject} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	tagName: 'aside',
	classNames: ['Aside', 'Aside--left'],

	isActive: computed.alias('uiStates.isPanelLeftVisible'),

	click(event) {
		const isALink = event.target.href;
		const isActive = get(this, 'isActive');
		if (isALink && isActive) {
			get(this, 'uiStates').closeLeftPanelIfSmallScreen();
		}
	},

	actions: {
		addTrack() {
			get(this, 'toggleModal')();
		}
	}
});
