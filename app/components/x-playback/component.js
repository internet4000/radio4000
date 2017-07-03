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

	didInsertElement() {
		var player = this.element.querySelector('radio4000-player');
		player.addEventListener('trackChanged', event => {
			console.info('[event:trackChanged]', event.detail);
			// const track = get(this, 'store').findRecord('track', event.detail.id);
			// get(this, 'player').playTrack(track);
		});
		player.addEventListener('trackEnded', event => {
			console.info('[event:trackEnded]', event.detail);
		});
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
