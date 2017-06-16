import Ember from 'ember';
import {EKMixin, keyUp} from 'ember-keyboard';

const {Component, get, set, inject, computed, on} = Ember;

export default Component.extend(EKMixin, {
	player: inject.service(),
	uiStates: inject.service(),
	classNames: ['Playback'],

	channel: computed.alias('player.currentChannel'),
	track: computed('player.currentTrack', function() {
		return get(this, 'player.currentTrack');
	}),

	cycleFormat: on(keyUp('KeyF'), function () {
		get(this, 'uiStates').cycleFormat();
	}),
	closeFullscreen: on(keyUp('Escape'), function () {
		set(this, 'uiStates.format', 1);
	}),

	actions: {
		toggleMinimizedFormat() {
			get(this, 'uiStates').toggleMinimizedFormat();
		},
		toggleFullscreenFormat() {
			get(this, 'uiStates').toggleFullscreenFormat();
		}
	}
});
