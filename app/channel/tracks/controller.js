import Ember from 'ember'
import Controller from '@ember/controller'

const {inject, get, $} = Ember;

export default Controller.extend({
	player: inject.service(),
	queryParams: ['search', 'locate'],
	search: '',
	locate: '',

	getSelectionFromJets() {
		const $els = $('.ListGroup .Track:visible')
		const ids = $.map($els, el => el.getAttribute('data-track-id'))
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
