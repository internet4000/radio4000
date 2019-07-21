import Controller from '@ember/controller'
import jQuery from 'jquery'
import {inject as service} from '@ember/service'
import {get} from '@ember/object'

export default Controller.extend({
	player: service(),
	queryParams: ['search'],
	search: '',

	getSelectionFromJets() {
		const $els = jQuery('.ListGroup .Track:visible')
		const ids = jQuery.map($els, el => el.getAttribute('data-track-id'))
		if (ids.length) {
			return ids
		}
		return []
	},

	actions: {
		playSelection(track) {
			const player = get(this, 'player')
			const selection = this.getSelectionFromJets()

			if (track) {
				get(this, 'player').playTrack(track)
			}

			if (selection.length) {
				const playlist = player.buildPlaylistExport(
					get(this, 'model.channel'),
					selection,
					get(this, 'search')
				)
				player.loadPlayistInWebComponent(playlist)
			}
		}
	}
})
