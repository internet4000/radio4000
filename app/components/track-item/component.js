import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';

export default Component.extend({
	player: service(),
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
