import Ember from 'ember';

const {Component, get, inject} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	tagName: 'aside',
	classNames: ['Aside', 'Aside--left'],

	click(event) {
		const isALink = event.target.href;
		const isVisible = get(this, 'uiStates.isPanelLeftVisible');
		if (isALink && isVisible) {
			get(this, 'uiStates').closeLeftPanelIfSmallScreen();
		}
	},

	actions: {
		addTrack() {
			get(this, 'toggleModal')();
		}
	}
});
