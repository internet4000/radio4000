import Ember from 'ember';
import 'npm:radio4000-player';

const {Component, get, inject, computed} = Ember;

export default Component.extend({
	player: inject.service(),
	uiStates: inject.service(),
	classNames: ['Playback'],

	channel: computed.alias('player.currentChannel'),
	track: computed('player.originTrack', function () {
		return get(this, 'player.originTrack');
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
