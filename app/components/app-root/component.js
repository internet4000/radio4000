/* global document */
import Component from '@ember/component'
import {get, set} from '@ember/object'
import {inject as service} from '@ember/service'
import firebase from 'firebase'

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
		var connectedRef = firebase.database().ref('.info/connected')

		// Don't remove dummy HTML if offline.
		connectedRef.on('value', snap => {
			if (snap.val() === true) {
				this.removeDummyHTML()
			} else {
				// not connected
			}
		})
	},

	// Remove our dummy app with inline styles.
	removeDummyHTML() {
		const dummy = document.querySelector('.DummyApp')
		if (dummy) {
			dummy.parentNode.removeChild(dummy)
		}
	},

	actions: {
		openAddTrack(track) {
			if (track) {
				set(this, 'url', track.url || '')
			}
			set(this, 'isShowingModal', true)
		},
		closeModal() {
			set(this, 'isShowingModal', false)
		},
		closeShortcutsModal() {
			set(this, 'uiStates.showShortcutsModal', false)
		},
		saveTrack(trackProperties) {
			return get(this, 'onSaveTrack')(trackProperties)
		}
	}
})
