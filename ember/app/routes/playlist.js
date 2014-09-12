import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('playlist', params.playlist_id);
	}

	// ,
	// setupController: function(controller, model) {
	// 	controller.set('content', model);
	// }

	// ,serialize: function(model) {
	// 	var cleanSlug = model.get('title');
	// 	cleanSlug = cleanSlug.toLowerCase().split(' ').join('-');

	// 	return {
	// 		playlist_title: cleanSlug
	// 	};
	// }
});
