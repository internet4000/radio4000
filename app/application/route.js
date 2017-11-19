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

	gotoRadios: on(keyUp('KeyM'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('channels.map');
    }
  }),

	gotoRadios: on(keyUp('KeyY'), function() {
    if (get(this, 'isGoingTo')) {
      this.transitionTo('channels.history');
    }
  }),

	gotoMyRadio: on(keyUp('KeyI'), function() {
    if (get(this, 'isGoingTo') && get(this, 'session.currentUser')) {
      this.transitionTo('channel', get(this, 'session.currentUser.channels.firstObject'));
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

	gotoCurrentTrack: on(keyUp('KeyT'), function() {
		const currentTrack = get(this, 'player.currentTrack');
    if (get(this, 'isGoingTo') && currentTrack) {
      this.transitionTo('channel.tracks.track', currentTrack);
    }
  })
});
