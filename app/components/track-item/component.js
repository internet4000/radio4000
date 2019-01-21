import Component from '@ember/component'
import {get, computed} from '@ember/object'
import {inject as service} from '@ember/service'

export default Component.extend({
	player: service(),
	router: service(),

	classNames: ['Track'],
	classNameBindings: [
		// 	'isCurrent',
		'track.liveInCurrentPlayer:Track--live',
		'track.playedInCurrentPlayer:Track--played',
		'track.finishedInCurrentPlayer:Track--finished',
		'mediaNotAvailable:Track--mediaNotAvailable',
		'track.discogsUrl:Track--hasDiscogs'
	],

	attributeBindings: [
		'track.ytid:data-pid',
		'track.id:data-track-id'
	],

	canEdit: computed.reads('track.channel.canEdit'),
	mediaNotAvailable: computed.and('track.mediaNotAvailable', 'canEdit'),

	play(track) {
		get(this, 'player').playTrack(track)
	},

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
			this.play(track)
		}
	}
})
