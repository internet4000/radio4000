App.SoundRoute = Ember.Route.extend({

	// get the model we want from ember data
	model: function(params) {
		return this.get('store').find('sound', params.sound_id);
	}

	// Use the model's "key" property for the URL instead of the default ID
	// ,serialize: function(model) {
	// 	return { sound_key: model.get('key') };
	// }

	// normally the post template would be rendered into the outlet of posts.
	// here we render it to the player outlet on the application template
	// ,renderTemplate: function() {
	// 	var controller = this.controllerFor('sound');
	// 	this.render('sound', {
	// 		into: 'application',
	// 		outlet: 'player',
	// 		controller: controller
	// 	});
	// }
});
