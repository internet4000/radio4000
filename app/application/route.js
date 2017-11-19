import Ember from 'ember';
import {EKMixin, keyUp} from 'ember-keyboard';

const {
	Route,
	set,
	get,
	on,
	run,
	inject,
} = Ember;

export default Route.extend(EKMixin, {
	session: inject.service(),
	player: inject.service(),

	// https://github.com/patience-tema-baron/ember-keyboard/issues/54
	isGoingTo: false,

  activateKeyboard: Ember.on('init', function() {
    set(this, 'keyboardActivated', true);
  }),

  goto: on(keyUp('KeyG'), function() {
    set(this, 'isGoingTo', true);
    run.later(() => {
      set(this, 'isGoingTo', false);
    }, 500);
  }),

	gotoHome: on(keyUp('KeyH'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('application');
    }
  }),

  gotoRadios: on(keyUp('KeyR'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('channels.all');
    }
  }),

	gotoMap: on(keyUp('KeyM'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('channels.map');
    }
  }),

	gotoHistory: on(keyUp('KeyY'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('channels.history');
    }
  }),

	// go `I`
	gotoMyRadio: on(keyUp('KeyI'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
    if (get(this, 'isGoingTo') && userChannel) {
      this.transitionTo('channel.index', userChannel);
    }
  }),

	// go `Starred`
	gotoMyRadioFavorites: on(keyUp('KeyS'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
    if (get(this, 'isGoingTo') && userChannel) {
      this.transitionTo('channel.favorites', userChannel);
    }
  }),

	// go `Starred`
	gotoMyRadioTracks: on(keyUp('KeyT'), function() {
		const userChannel = get(this, 'session.currentUser.channels.firstObject')
    if (get(this, 'isGoingTo') && userChannel) {
      this.transitionTo('channel.tracks', userChannel);
    }
  }),

	gotoAddTrack: on(keyUp('KeyA'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('add');
    }
  }),

	gotoFeedback: on(keyUp('KeyF'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('feedback');
    }
  }),

	gotoCurrentChannel: on(keyUp('KeyC'), function() {
		const currentChannel = get(this, 'player.currentChannel');
    if (get(this, 'isGoingTo') && currentChannel) {
      this.transitionTo('channel', currentChannel);
    }
  }),

	gotoCurrentTrack: on(keyUp('KeyX'), function() {
		const currentTrack = get(this, 'player.currentTrack');
    if (get(this, 'isGoingTo') && currentTrack) {
      this.transitionTo('channel.tracks.track', currentTrack);
    }
  })
});
