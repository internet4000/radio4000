import Ember from 'ember'
import Mixin from '@ember/object/mixin'
import {EKMixin, keyUp} from 'ember-keyboard'

const {
	set,
	get,
	on,
	run
} = Ember

/*CHAT BUFFER

*/

export default Mixin.create(EKMixin, {
	// https://github.com/patience-tema-baron/ember-keyboard/issues/54
	isGoingTo: false,

	activateKeyboard: Ember.on('init', function() {
		set(this, 'keyboardActivated', true)
	}),

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

	onKeyR: on(keyUp('KeyR'), function () {
		if (get(this, 'isGoingTo')) {
			this.transitionTo('channels.all')
		} else {
			alert('play random')
		}
	}),
	// goingTo not defined
	// it says
	// can't see what it is. had it working locally here some days ago
	// TypeError: undefined has no properties , line 44
	// wait wait
	// gotoHome: on(keyUp('KeyH'), function () {
		// this.goingTo('application')
	// }),
	// I think the arrow functions are messing it up
	gotoHome: on(keyUp('KeyH'), function() {
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
	gotoFeedback: on(keyUp('KeyF'), function() {
		this.goingTo('feedback')
	}),
	// gotoHome: on(keyUp('KeyH'), () => this.goingTo('application')),
	// gotoMap: on(keyUp('KeyM'), () => this.goingTo('channels.map')),
	// gotoHistory: on(keyUp('KeyY'), () => this.goingTo('channels.history')),
	// gotoAddTrack: on(keyUp('KeyA'), () => this.goingTo('add')),
	// gotoFeedback: on(keyUp('KeyF'), () => this.goingTo('feedback')),

	// go `I`
	gotoMyRadio: on(keyUp('KeyI'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
		if (userChannel) {
			this.goingTo('channel.index', userChannel)
		}
	}),

	// go `Starred`
	gotoMyRadioFavorites: on(keyUp('KeyS'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
		if (userChannel) {
			this.goingTo('channel.favorites', userChannel)
		}
	}),

	gotoMyRadioTracks: on(keyUp('KeyT'), function() {
		const userChannel = get(this, 'session1.currentUser.channels.firstObject')
		if (userChannel) {
			this.goingTo('channel.tracks', userChannel)
		}
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
