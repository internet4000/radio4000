import Mixin from '@ember/object/mixin'
import {get, set, computed} from '@ember/object'
import {on} from '@ember/object/evented'
import {inject as service} from '@ember/service'
import {run} from '@ember/runloop'
import {EKMixin, keyUp, keyDown} from 'ember-keyboard'
import $ from 'jquery'

export default Mixin.create(EKMixin, {
	flashMessages: service(),
	player: service(),
	router: service(),
	uiStates: service(),

	// https://github.com/patience-tema-baron/ember-keyboard/issues/54
	isGoingTo: false,

	onChannelRoute: computed(function() {
		return this.router.currentRouteName.startsWith('channel.')
	}),

	activateKeyboard: on('init', function() {
		set(this, 'keyboardActivated', true)
	}),

	// Pressing `g` enables shortcuts that go/transition somewhere.
	goto: on(keyUp('KeyG'), function() {
		set(this, 'isGoingTo', true)
		run.later(() => {
			set(this, 'isGoingTo', false)
		}, 500)
	}),
	goingTo() {
		if (get(this, 'isGoingTo')) {
			this.transitionTo.apply(this, arguments)
		}
	},

	// Only trigger click is `g` WAS NOT pressed.
	triggerClick(selector) {
		const el = document.querySelector(`${selector}`)
		if (get(this, 'isGoingTo') || !el) {
			return
		}
		$(el).trigger('click')
	},

	toggleShortcutsModal: on(keyUp('shift+Slash'), function() {
		this.toggleProperty('uiStates.showShortcutsModal')
	}),

	focusSearchInput: on(keyDown('Slash'), function(event) {
		event.preventDefault()
		const input = document.querySelector('.InputAutocomplete .aa-input')
		if (input) input.focus()
	}),

	playPause: on(keyUp('KeyP'), function() {
		this.triggerClick('radio4000-player .PlayPause-state')
	}),
	playNext: on(keyUp('KeyN'), function() {
		this.triggerClick('radio4000-player .Btn--next')
	}),
	toggleShuffle: on(keyUp('KeyS'), function() {
		this.triggerClick('radio4000-player .Btn--shuffle')
	}),
	toggleMute: on(keyUp('KeyM'), function() {
		this.triggerClick('radio4000-player .Btn--mute')
	}),
	closeFullscreen: on(keyUp('Escape'), function() {
		if (get(this, 'uiStates.isFullscreen')) {
			set(this, 'uiStates.format', 1)
		}
	}),
	toggleSidebar: on(keyUp('KeyB'), function() {
		this.get('uiStates').togglePanelLeft();
	}),
	onKeyR: on(keyUp('KeyR'), function() {
		if (get(this, 'isGoingTo')) {
			this.transitionTo('channels.search')
		} else {
			get(this, 'flashMessages').info('...finding a random radio channel to play')
			get(this, 'player.playRandomChannel').perform()
		}
	}),
	gotoChannelHome: on(keyUp('KeyH'), function() {
		this.goingTo('channel.index', this.modelFor('channel'))
	}),
	gotoHome: on(keyUp('KeyG'), function() {
		this.goingTo('application')
	}),
	gotoMap: on(keyUp('KeyM'), function() {
		this.goingTo('channels.map')
	}),
	gotoHistory: on(keyUp('KeyY'), function() {
		this.goingTo('channels.history')
	}),
	gotoAddTrack: on(keyUp('KeyA'), function() {
		this.goingTo('add')
	}),
	goToSettings: on(keyUp('KeyS'), function() {
		this.goingTo('settings')
	}),
	cyclePlayerLayout: on(keyUp('KeyF'), function() {
		// because we use f for another shortcut.
		if (!get(this, 'isGoingTo')) {
			get(this, 'uiStates').cycleFormat()
		}
	}),
	// go `I`
	gotoMyRadio: on(keyUp('KeyI'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
		if (userChannel) {
			this.goingTo('channel.index', userChannel)
		}
	}),
	gotoMyRadioFavorites: on(keyUp('KeyF'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
		const onChannelRoute = get(this, 'onChannelRoute')
		const channel = onChannelRoute ? this.modelFor('channel') : userChannel
		this.goingTo('channel.favorites', channel)
	}),
	gotoMyRadioTracks: on(keyUp('KeyT'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
		const onChannelRoute = get(this, 'onChannelRoute')
		const channel = onChannelRoute ? this.modelFor('channel') : userChannel
		this.goingTo('channel.tracks', channel)
	}),
	gotoCurrentChannel: on(keyUp('KeyC'), function() {
		const currentChannel = get(this, 'player.currentChannel')
		if (currentChannel) {
			this.goingTo('channel', currentChannel)
		}
	}),
	gotoCurrentTrack: on(keyUp('KeyX'), function() {
		const currentChannel = get(this, 'player.currentChannel')
		const currentTrack = get(this, 'player.currentTrack')
		if (currentChannel && currentTrack) {
			this.goingTo('channel.tracks.track', currentChannel, currentTrack)
		}
	})
})
