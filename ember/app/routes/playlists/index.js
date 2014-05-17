var PlaylistsIndexRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.findAll('playlist');
	}
});

export default PlaylistsIndexRoute;
