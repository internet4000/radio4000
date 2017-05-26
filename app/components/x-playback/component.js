import Ember from 'ember';
import {task} from 'ember-concurrency';
import {EKMixin, keyDown} from 'ember-keyboard';

const {Component, get, set, inject, computed, on, run, $} = Ember;

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

	activateKeyboard: on('init', function () {
		set(this, 'keyboardActivated', true);
	}),
	swapShortcut: on(keyDown('KeyW'), function () {
		console.log('swap shortcut');
		get(this, 'swap').perform();
	}),
	playbackShortcut: on(keyDown('KeyP'), function () {
		this.send('togglePlay');
	}),
	skipShortcut: on(keyDown('KeyS'), function () {
		this.send('next');
	}),
	muteShortcut: on(keyDown('KeyM'), function () {
		this.send('toggleVolume');
	}),
	cycleFormat: on(keyDown('KeyF'), function () {
		get(this, 'uiStates').cycleFormat();
	}),
	closeFullscreen: on(keyDown('Escape'), function () {
		set(this, 'uiStates.format', 1);
	}),

	swap: task(function * () {
		const previous = get(this, 'player.playlist');
		const channel = yield get(this, 'bot.playAnotherRadio').perform(previous);
		return channel;
	}).keepLatest(),

	actions: {
		togglePlay() {
			get(this, 'emberYoutube').send('togglePlay');
		},
		toggleVolume() {
			get(this, 'emberYoutube').send('toggleVolume');
		},
		play() {
			get(this, 'emberYoutube').send('play');
		},
		pause() {
			get(this, 'emberYoutube').send('pause');
		},
		prev() {
			get(this, 'player').prev();
		},
		next() {
			get(this, 'player').next();
		},
		toggleRandom(player = this.get('player')) {
			if (player.get('isRandom')) {
				player.deactivateRandom();
			} else {
				player.activateRandom();
			}
		},
		scrollToTrack() {
			// We wrap the actual scrolling inside this run loop,
			// to minimize jank. Seems to work better.
			run.scheduleOnce('afterRender', () => {
				run.later(() => {
					const $container = $('.html, body');
					const offset = $('.Track.is-current').offset().top - 90;
					$container.animate({scrollTop: offset}, 700, 'swing');
				}, 60);
			});
		},

		toggleMinimizedFormat() {
			get(this, 'uiStates').toggleMinimizedFormat();
		},
		toggleFullscreenFormat() {
			get(this, 'uiStates').toggleFullscreenFormat();
		},

		// ember-youtube events
		onYouTubePlay() {
			get(this, 'player').play();
		},
		onYouTubePause() {
			get(this, 'player').pause();
		},
		onYouTubeEnd() {
			get(this, 'player').trackEnded();
		},
		onYouTubeError(error) {
			get(this, 'player').onError(error);
		}
	}
});
