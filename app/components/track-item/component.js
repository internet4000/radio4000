import Ember from 'ember';

const {Component, computed, inject} = Ember;

export default Component.extend({
	player: inject.service(),
	classNames: ['Track'],
	classNameBindings: [
		'isCurrent',
		'track.liveInCurrentPlayer:Track--live',
		'track.playedInCurrentPlayer:Track--played',
		'track.finishedInCurrentPlayer:Track--finished'
	],
	attributeBindings: ['track.ytid:data-pid'],

	// true if the current track is loaded in the player
	// isCurrent: computed.equal('player.model', 'track'),
	isCurrent: computed('player.currentTrack', 'track', function () {
		return this.get('player.currentTrack') === this.get('track');
	}),

	actions: {
		edit() {
			this.get('edit')(this.get('track'));
		},
		play(track) {
			this.set('player.model', track);
		}
	}
});
