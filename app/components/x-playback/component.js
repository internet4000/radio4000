import Ember from 'ember';
import {task} from 'ember-concurrency';
import {EKMixin, keyUp} from 'ember-keyboard';

const {Component, inject, computed, on, run, $} = Ember;

export default Component.extend(EKMixin, {
	player: inject.service(),
	bot: inject.service(),
	uiStates: inject.service(),
	classNames: ['Playback'],
	channel: computed.alias('player.model.channel'),

	youtubePlayerVars: {
		autoplay: 1,
		showinfo: 0
	},

	activateKeyboard: Ember.on('init', function () {
		this.set('keyboardActivated', true);
	}),

	swapShortcut: on(keyUp('KeyW'), function () {
		this.get('swap').perform();
	}),

	playbackShortcut: on(keyUp('KeyP'), function () {
		this.send('togglePlay');
	}),
	skipShortcut: on(keyUp('KeyS'), function () {
		this.send('next');
	}),
	muteShortcut: on(keyUp('KeyM'), function () {
		this.send('toggleVolume');
	}),
	closeFullscreen: on(keyUp('Escape'), function () {
		if (this.get('uiStates.player.isMaximized')) {
			this.send('toggleMaximizedPlayer');
		}
	}),

	swap: task(function * () {
		const previous = this.get('player.playlist');
		const channel = yield this.get('bot.playAnotherRadio').perform(previous);
		return channel;
	}).keepLatest(),

	actions: {
		togglePlay() {
			this.get('emberYoutube').send('togglePlay');
		},
		toggleVolume() {
			this.get('emberYoutube').send('toggleVolume');
		},
		play() {
			this.get('emberYoutube').send('play');
		},
		pause() {
			this.get('emberYoutube').send('pause');
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
