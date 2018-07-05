/* global document */
import Component from '@ember/component'
import {get, set} from '@ember/object'
import { inject as service } from '@ember/service'
import {run} from '@ember/runloop'

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
		openAddTrack(track) {
			if (track) {
				set(this, 'url', track.url || '');
			}
			set(this, 'isShowingModal', true);
		},
		closeModal() {
			set(this, 'isShowingModal', false);
		},
		closeShortcutsModal() {
			set(this, 'uiStates.showShortcutsModal', false)
		},
		saveTrack(trackProperties) {
			return get(this, 'onSaveTrack')(trackProperties);
		}
	}
});
