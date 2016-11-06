import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
    tagName: ['button'],
    classNames: ['PlayPause'],
    isPlaying: false,
    attributeBindings: ['title'],
    title: computed('isPlaying', function () {
	return this.get('isPlaying') ? 'Pause music playback' : 'Start music playback (play)';
    }),

    click() {
	if (this.get('isPlaying')) {
	    this.sendAction('pause');
	} else {
	    this.sendAction('play');
	}
    }
});
