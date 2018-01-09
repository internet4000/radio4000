import Ember from 'ember'

const { Component, computed, get, set, inject } = Ember

export default Component.extend({
	player: inject.service(),
	router: inject.service(),

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
	isCurrent: computed('player.currentTrack', 'track', function() {
		return this.get('player.currentTrack') === this.get('track')
	}),

	actions: {
		onEdit() {
			if (get(this, 'inline')) {
				this.toggleProperty('isEditing')
			} else {
				window.alert('transition to track.edit')
			}
		},
		copyTrack(track) {
			get(this, 'router').transitionTo('add', {
				queryParams: {
					url: track.get('url'),
					title: track.get('title'),
					body: track.get('body')
				}
			})
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
})
