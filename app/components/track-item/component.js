import Ember from 'ember';

const {Component, computed, get, set, inject} = Ember;

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

	onEdit() {
		if (get(this, 'inline')) {
			// action "edit"
		} else {
			// go to
			/* {{link-to 'Edit' 'channel.tracks.track.edit' track
				 class="Btn Btn--text Muted Track-controls"
				 title="Edit the track"}}*/
		}
	},

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
