App.SoundRoute = Ember.Route.extend({
	model: function(params) {
		return this.get('store').find('sound', params.sound_id);
	},

	// Pass the model to the controller of "playback".
	// We need this to persist the template between routes
	,setupController: function(controller, model) {
		this.controllerFor('playback').set('model', model);
		this.controllerFor('playback').set('provider', model.get('provider'));
	}
});
