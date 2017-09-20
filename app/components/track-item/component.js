import Ember from 'ember';

const {Component, get, set, inject} = Ember;

export default Component.extend({
	player: inject.service(),
	classNames: ['Track'],
	classNameBindings: [
		'track.liveInCurrentPlayer:Track--live',
		'track.playedInCurrentPlayer:Track--played',
		'track.finishedInCurrentPlayer:Track--finished'
	],
	attributeBindings: ['track.ytid:data-pid'],

	// // true if the current track is loaded in the player
	// isCurrent: computed('player.currentTrack', 'track', function () {
	// 	return this.get('player.currentTrack') === this.get('track');
	// }),

	actions: {
		edit() {
			this.toggleProperty('isEditing')
		},
		play(track) {
			get(this, 'player').playTrack(track)
		},
		goBack(rollback) {
			if (rollback) {
				get(this, 'track').rollbackAttributes()
			}
			set(this, 'isEditing', false)
		}
	}
});
