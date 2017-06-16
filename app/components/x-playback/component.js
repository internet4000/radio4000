import Ember from 'ember';
import {task} from 'ember-concurrency';
import {EKMixin, keyDown} from 'ember-keyboard';

const {Component, get, set, inject, computed, on, run, $} = Ember;

export default Component.extend(EKMixin, {
	player: inject.service(),
	uiStates: inject.service(),
	classNames: ['Playback'],
	channel: computed.alias('player.model.channel'),
	track: computed.alias('player.model'),

	cycleFormat: on(keyDown('KeyF'), function () {
		get(this, 'uiStates').cycleFormat();
	}),
	closeFullscreen: on(keyDown('Escape'), function () {
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
