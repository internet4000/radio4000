import Ember from 'ember';
import {EKMixin, keyUp} from 'ember-keyboard';
import 'npm:radio4000-player';

const {Component, get, set, inject, computed, on} = Ember;

export default Component.extend(EKMixin, {
	player: inject.service(),
	uiStates: inject.service(),
	classNames: ['Playback'],

	channel: computed.alias('player.currentChannel'),

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
		player.addEventListener('channelChanged', event => this.onChannelChanged(event), {passive: false});
	},

	onTrackChanged(event) {
		get(this, 'player').onTrackChanged(event.detail[0]);
	},

	onTrackEnded(event) {
		get(this, 'player').onTrackEnded(event.detail[0]);
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
