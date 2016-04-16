import Ember from 'ember';
import {EKMixin, keyUp} from 'ember-keyboard';

const {Component, inject, computed, on, run, $} = Ember;

export default Component.extend(EKMixin, {
	classNames: ['Playback'],
	player: inject.service(),
	uiStates: inject.service(),
	channel: computed.alias('player.model.channel'),

	youtubePlayerVars: {
	    autoplay: 1,
	    showinfo: 0
	},

	// Keyboard shortucts.
	activateKeyboard: Ember.on('init', function () {
		this.set('keyboardActivated', true);
	}),
	onSpaceClick: on(keyUp(' '), function () {
		this.send('togglePlay');
	}),
	closeFullscreen: on(keyUp('Escape'), function () {
		if (this.get('uiStates.player.isMaximized')) {
			this.send('toggleMaximizedPlayer');
		}
	}),

	actions: {
		togglePlay() {
			this.get('emberYouTube').send('togglePlay');
		},
		toggleVolume() {
			this.get('emberYouTube').send('toggleVolume');
		},
		play() {
			this.get('emberYouTube').send('play');
		},
		pause() {
			this.get('emberYouTube').send('pause');
		},
		prev() {
			this.get('player').prev();
		},
		next() {
			this.get('player').next();
		},
		toggleRandom(player = this.get('player')) {
			if (player.get('isRandom')) {
				player.deactivateRandom();
			} else {
				player.activateRandom();
			}
		},
		scrollToTrack() {
			// Scroll afterRender and a bit later to not jank the computer
			run.scheduleOnce('afterRender', () => {
				run.later(() => {
					const $container = $('.html, body');
					const offset = $('.Track.is-current').offset().top - 90;
					$container.animate({scrollTop: offset}, 700, 'swing');
				}, 100);
			});
		},

		// player size states
		toggleMaximizedPlayer() {
			this.set('uiStates.player.isMinimized', false);
			this.toggleProperty('uiStates.player.isMaximized');
		},
		toggleMinimizedPlayer() {
			this.set('uiStates.player.isMaximized', false);
			this.toggleProperty('uiStates.player.isMinimized');
		},

		// ember-youtube events
		onYouTubePlay() {
			this.get('player').play();
		},
		onYouTubePause() {
			this.get('player').pause();
		},
		onYouTubeEnd() {
			this.get('player').trackEnded();
		},
		onYouTubeError(error) {
			this.get('player').onError(error);
		}
	}
});
