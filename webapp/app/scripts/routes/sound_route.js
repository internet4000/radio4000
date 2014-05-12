App.SoundRoute = Ember.Route.extend({

	// get the model we want from ember data
	model: function(params) {
		return this.get('store').find('sound', params.sound_id);
	}

	// Use the model's "key" property for the URL instead of the default ID
	// ,serialize: function(model) {
	// 	return { sound_key: model.get('key') };
	// }

	// Normally the post template would be rendered into the outlet of sounds.hbs
	// Instead we render it to the 'player' outlet of application.hbs
	// ,renderTemplate: function() {
	// 	// var controller = this.controllerFor('sound');
	// 	this.render('sound', {
	// 		into: 'application',
	// 		outlet: 'player'
	// 		// ,controller: controller
	// 	});
	// }

	// Pass the model to the controller of "playback".
	// We need this to persist the template between routes
	,setupController: function(controller, model) {
		this.controllerFor('playback').set('model', model);
		this.controllerFor('playback').set('provider', model.get('provider'));
	}
});
