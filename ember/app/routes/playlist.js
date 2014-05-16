var PlaylistRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('playlist', params.playlist_id);
	}
});

export default PlaylistRoute;
