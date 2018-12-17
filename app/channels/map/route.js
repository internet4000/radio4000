import Route from '@ember/routing/route'

export default Route.extend({
	// The params are defined on the controller.
	// Here we tell it to replace instead of push state.
	queryParams: {
		lat: {replace: true},
		lng: {replace: true},
		zoom: {replace: true}
	},

	model() {
		return this.store.findAll('channel')
	}
})
