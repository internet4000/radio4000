import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	tagName: ['button'],
	classNames: ['PlayPause'],
	attributeBindings: ['title'],
	isPlaying: false,

	title: computed('isPlaying', function () {
		return get(this, 'isPlaying') ? 'Pause music playback' : 'Start music playback (play)';
	}),

	click() {
		if (get(this, 'isPlaying')) {
			this.sendAction('pause');
		} else {
			this.sendAction('play');
		}
	}
});

