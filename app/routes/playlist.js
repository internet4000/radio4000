import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('playlist', params.playlist_slug);
		// return this.modelFor('playlists').findBy('slug', params.playlist_slug);
	},
	serialize: function(model) {
		// this will make the URL `/p/whatever-title`
		return {
			// playlist_slug: model.get('slug')
			playlist_slug: model.get('title').replace(/\s+/g, '-').toLowerCase()
		};
	}
});
