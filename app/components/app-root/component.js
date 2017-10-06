/* global document */
import { inject as service } from '@ember/service';

import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
	uiStates: service(),
	player: service(),
	store: service(),
	session: service(),

	classNames: ['Root'],
	classNameBindings: [
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
		if (dummy) {
			dummy.parentNode.removeChild(dummy);
		}
	},

	actions: {
		toggleModal() {
			this.toggleProperty('isShowingModal');
			this.set('url', '');
		},
		saveTrack(trackProperties) {
			return this.get('onSaveTrack')(trackProperties);
		}
	}
});
