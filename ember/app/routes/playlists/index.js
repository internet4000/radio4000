var PlaylistsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('playlist');
	}
});

export default PlaylistsIndexRoute;
