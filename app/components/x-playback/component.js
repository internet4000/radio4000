import Ember from 'ember';
// To develop using the radio4000-player served locally
// (usually served over localhost:4002)
// 1- comment out the following `import`
// 2- comment in the `script` tag in the `template.hbs`
// cheers
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
		const player = this.element.querySelector('radio4000-player')
		const options = {passive: false}
		player.addEventListener('trackChanged', event => this.onTrackChanged(event), options)
		player.addEventListener('trackEnded', event => this.onTrackEnded(event), options)
		player.addEventListener('channelChanged', event => this.onChannelChanged(event), options)
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
