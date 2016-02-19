import Ember from 'ember';
import {EKMixin, keyUp} from 'ember-keyboard';

const {Component, inject, on, run, $} = Ember;

export default Component.extend(EKMixin, {
	classNames: ['Playback'],
	player: inject.service(),
	uiStates: inject.service(),

	activateKeyboard: Ember.on('init', function () {
		this.set('keyboardActivated', true);
	}),

	onSpaceClick: on(keyUp(' '), function () {
		this.send('togglePlay');
	}),

	actions: {
		togglePlay() {
			this.attrs.radioDevice.value.send('togglePlay');
		},
		toggleVolume() {
			this.attrs.radioDevice.value.send('toggleVolume');
		},
		play() {
			// const canPlay = get(this, 'player.model');
			// if (!canPlay) {
			// 	console.log('@todo play a random radio now');
			// }
			this.attrs.radioDevice.value.send('play');
		},
		pause() {
			this.attrs.radioDevice.value.send('pause');
		},
		toggleRandom(player = this.get('player')) {
			if (player.get('isRandom')) {
				player.deactivateRandom();
			} else {
				player.activateRandom();
			}
		},
		prev() {
			this.get('player').prev();
		},
		next() {
			this.get('player').next();
		},
		toggleFullscreen() {
			this.toggleProperty('uiStates.isFullscreen');
		},
		scrollToTrack() {
			// Scroll afterRender and a bit later to not jank the computer
			run.scheduleOnce('afterRender', function () {
				run.later(() => {
					$('.Channel-outlet').animate({
						scrollTop: $('.Track.is-current').offset().top - 90
					}, 700, 'swing');
				}, 100);
			});
		}
	}
});

// gets the index of the current track
// currentTrackIndex: Ember.computed('tracks', 'model', function () {
// 	return this.get('tracks').indexOf(this.get('model'));
// }),

// resetRemote: Ember.on('init', function () {
// 	let channel = this.get('session.currentUser.channels.firstObject');
// }),

// // @TODO: this should only be active if the user enabled "remote control" setting
// // (which doesn't exist yet)
// updateFromRemote: Ember.observer('session.currentUser.channels.firstObject.listeningToTrack', function () {

// 	if (!this.get('session.currentUser')) {
// 		Ember.warn('updated without user');
// 		return;
// 	}

// 	const channel = this.get('session.currentUser.channels.firstObject');
// 	const track = channel.get('listeningToTrack');

// 	debug(channel);
// 	debug(track);

// 	if (!track) {
// 		Ember.warn('updated without track');
// 		return;
// 	}

// 	debug('remotely changed track');
// 	this.set('channel', channel);
// 	this.set('model', track);
// }),
