import Ember from 'ember'

const { Component, get, set, inject, computed } = Ember

export default Component.extend({
	player: inject.service(),
	router: inject.service(),

	classNames: ['Track'],
	classNameBindings: [
		// 	'isCurrent',
		'track.liveInCurrentPlayer:Track--live',
		'track.playedInCurrentPlayer:Track--played',
		'track.finishedInCurrentPlayer:Track--finished',
		'mediaNotAvailable:Track--mediaNotAvailable'
	],

	attributeBindings: [
		'track.ytid:data-pid',
		'track.id:data-track-id'
	],

	canEdit: computed.reads('track.channel.canEdit'),
	mediaNotAvailable: computed.and('track.mediaNotAvailable', 'canEdit'),

	actions: {
		onEdit(track) {
			// get(this, 'router').transitionTo('channel.tracks.track.edit', track)
			get(this, 'router').transitionTo({
				queryParams: {
					editTrack: track.id
				}
			})
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
