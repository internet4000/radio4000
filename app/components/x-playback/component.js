import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { on } from '@ember/object/evented';
import { EKMixin, keyUp } from 'ember-keyboard';
import 'npm:radio4000-player';

export default Component.extend(EKMixin, {
	player: service(),
	uiStates: service(),
	classNames: ['Playback'],

	channel: alias('player.currentChannel'),
	track: computed('player.originTrack', function () {
		return get(this, 'player.originTrack');
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
