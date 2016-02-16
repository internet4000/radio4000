import Ember from 'ember';

const {Component, inject} = Ember;

export default Component.extend({
	tagName: 'aside',
	classNames: ['Aside'],

	uiStates: inject.service(),

	click(event) {
		const clickedElementHasAnHref = event.target.href;
		if (clickedElementHasAnHref && this.get('uiStates.isPanelLeftVisible')) {
			this.get('uiStates').perhapsClosePanel();
		}
	}
});
