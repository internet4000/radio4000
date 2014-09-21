import Ember from 'ember';

export default Ember.Route.extend({
	// model: function(params) {
	// 	return this.store.find('playlist', params.playlist_id);
	// 	// return this.modelFor('playlists').findBy('slug', params.playlist_slug);
	// }
	// ,
	// serialize: function(model) {
	// 	return { playlist_slug: model.get('title') };
	// }
	activate: function() {
		Ember.$('.SiteLogo').addClass('is-translated');
	},
	deactivate: function() {
		Ember.$('.SiteLogo').removeClass('is-translated');
	}
});
