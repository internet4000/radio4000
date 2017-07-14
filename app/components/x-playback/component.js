import Ember from 'ember';
import {EKMixin, keyUp} from 'ember-keyboard';

const {Component, get, set, inject, computed, on} = Ember;

export default Component.extend(EKMixin, {
	player: inject.service(),
	uiStates: inject.service(),
	classNames: ['Playback'],

	channel: computed.alias('player.currentChannel'),
	track: computed('player.currentTrack', function () {
		return get(this, 'player.currentTrack');
	}),

	cycleFormat: on(keyUp('KeyF'), function () {
		get(this, 'uiStates').cycleFormat();
	}),
	closeFullscreen: on(keyUp('Escape'), function () {
		set(this, 'uiStates.format', 1);
	}),

	/* register events */
	didInsertElement() {
		var player = this.element.querySelector('radio4000-player');
		player.addEventListener('trackChanged', event => this.onTrackChanged(event), {passive: false});
		player.addEventListener('trackEnded', event => this.onTrackEnded(event), {passive: false});
	},

	/* FIXME what event should we remove?
		 they are created in an anonymous function */
	didDestroyElement() {
		var player = this.element.querySelector('radio4000-player');
		player.removeEventListener('trackChanged', this.onTrackChanged);
		player.removeEventListener('trackEnded', this.onTrackEnded);
	},

	onTrackChanged(event) {
		console.info('[event:trackChanged]', event.detail);
		get(this, 'player').onTrackChanged(event.detail[0].id);
	},

	onTrackEnded(event) {
		console.info('[event:trackEnded]', event.detail);
		get(this, 'player').onTrackChanged(event.detail[0].id);
	},

	actions: {
		toggleMinimizedFormat() {
			get(this, 'uiStates').toggleMinimizedFormat();
		},
		toggleFullscreenFormat() {
			get(this, 'uiStates').toggleFullscreenFormat();
		}
	}
});
