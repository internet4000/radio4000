import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
	model: function(params) {
		// return this.modelFor('playlists').findBy('slug', params.playlist_slug);
		return this.store.find('playlist', params.playlist_id).then(function(){
			Ember.debug('yes!');
		}, function() {
			Ember.warn('not so much');
			this.modelBySlug(params);
		}.bind(this));
	},

	// because we use slugs instead of ids in the url
	// we need to tell ember that
	serialize: function(model) {
		return { playlist_id: model.get('slug') };
	},

	// but it doesn't work with emberfire, so here's a manual fallback
	// unfortunately it needs to go through all playlists to find the right one
	// but it's actually not that slow, YET
	modelBySlug: function(params) {
		console.log(params);
		this.store.findAll('playlist').then(function(playlists) {
			Ember.debug('Looking for a playlist among aaaall playlists…');
			playlists.forEach(function(item) {
				if (item.get('slug') === params.playlist_id) {
					Ember.debug('found it!');
					this.controller.set('model', item);
				}
			}.bind(this));
		}.bind(this));
	},

	activate: function() {
		Ember.$('.SiteLogo').addClass('is-translated');
	},
	deactivate: function() {
		Ember.$('.SiteLogo').removeClass('is-translated');
	}
});
