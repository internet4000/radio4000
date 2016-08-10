import Ember from 'ember';

const {Component, inject} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	tagName: 'aside',
	classNames: ['Aside'],

	click(event) {
		const clickedElementHasAnHref = event.target.href;
		if (clickedElementHasAnHref && this.get('uiStates.isPanelLeftVisible')) {
			this.get('uiStates').closeLeftPanelIfSmallScreen();
		}
	},

	actions: {
		addTrack() {
			this.get('toggleModal')();
		}
	}
});
