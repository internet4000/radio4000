import Controller from '@ember/controller'

export default Controller.extend({
	queryParams: ['search'],
	search: '',
	getSelectionFromJets: function() {
		const $els = $('.ListGroup .List-item:visible')
		const ids = $.map($els, el => el.getAttribute('data-track-id'))
		if(ids.length) {
			return ids
		} else {
			return [];
		}
	},
})
