import Ember from 'ember'

const { Component, get, set, inject } = Ember

export default Component.extend({
	player: inject.service(),
	router: inject.service(),

	classNames: ['Track'],
	classNameBindings: [
		// 	'isCurrent',
		'track.liveInCurrentPlayer:Track--live',
		'track.playedInCurrentPlayer:Track--played',
		'track.finishedInCurrentPlayer:Track--finished'
	],
	attributeBindings: ['track.ytid:data-pid'],

	actions: {
		onEdit(track) {
			get(this, 'router').transitionTo('channel.tracks.track.edit', track)
			// if (get(this, 'inline')) {
			// 	this.toggleProperty('isEditing')
			// } else {
			// }
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
			// get(this, 'playSelection')(track)
			get(this, 'player').playTrack(track)
		},
		edit() {
			this.toggleProperty('isEditing')
		},
		goBack(rollback) {
			if (rollback) {
				get(this, 'track').rollbackAttributes()
			}
			set(this, 'isEditing', false)
		}
	}
})
