var PlaylistRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('playlist', params.playlist_id);
	}

	// ,serialize: function(model) {
	// 	var cleanSlug = model.get('title');
	// 	cleanSlug = cleanSlug.toLowerCase().split(' ').join('-');

	// 	return {
	// 		playlist_title: cleanSlug
	// 	};
	// }
});

export default PlaylistRoute;


