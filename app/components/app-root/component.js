/* global document */
import Ember from 'ember';

const {Component, inject, run} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	player: inject.service(),
	store: inject.service(),
	session: inject.service(),

	classNames: ['Root'],
	classNameBindings: [
		'isEmbed',
		'isInverted',
		'uiStates.isMinimized',
		'uiStates.isFullscreen:is-maximized',
		'uiStates.isPanelLeftVisible:is-panelLeftVisible',
		'player.isPlaying:is-withPlayer:is-withoutPlayer'
	],
	isShowingModal: false,

	didInsertElement() {
		run.scheduleOnce('afterRender', () => {
			this.removeDummyHTML();
		});
	},

	// Remove our dummy app with inline styles.
	removeDummyHTML() {
		const dummy = document.querySelector('.DummyApp');
		if (!dummy) {
			return;
		}
		dummy.parentNode.removeChild(dummy);
	},

	actions: {
		toggleModal() {
			this.toggleProperty('isShowingModal');
		},
		saveTrack(trackProperties) {
			return this.get('onSaveTrack')(trackProperties);
		}
	}
});
