/* global document */
import Ember from 'ember';
import { inject as service } from '@ember/service'

const {Component, run, get, set} = Ember;

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
		saveTrack(trackProperties) {
			return get(this, 'onSaveTrack')(trackProperties);
		}
	}
});
