import UserChannelRoute from 'radio4000/routes/user-channel'

export default UserChannelRoute.extend({
	setupController(controller, model) {
		controller.set('initialSlug', model.get('slug'))
		this._super(...arguments)
	},

	deactivate() {
		// Clear any unsaved changes.
		this.currentModel.rollbackAttributes()
	}
})
