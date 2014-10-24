import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		// return this.modelFor('playlists').findBy('slug', params.playlist_slug);
		return this.store.find('playlist', params.playlist_id).then(function(){
			// this doesn't work because id (= slug) should use findby and emberfire meh
		}, function() {
			// Ember.warn('not so much');
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
		this.store.find('playlist').then(function(playlists) {
			Ember.debug('Looking for a playlist among aaaall playlists…');
			playlists.forEach(function(playlist) {
				if (playlist.get('slug') === params.playlist_id) {
					Ember.debug('found it!');
					this.controllerFor('playlist').set('model', playlist);

					// set document title
					document.title = playlist.get('title') + ' - Radio4000';

					// open 'add track' if there are no tracks
					// var canEdit = this.controllerFor(playlist).get('canEdit');
					// if (canEdit && playlist.get('tracks.length') === 0) {
					// 	this.transitionTo('playlist.add', playlist);
					// }
				}
			}.bind(this));
		}.bind(this));
	},

	// @TODO: this hook isn't reliable until we fix slug hack
	// afterModel: function(model) {},

	deactivate: function() {
		// Make sure playlist description is closed
		this.controller.set('isExpanded', false);
		// Reset doc title
		document.title = 'Radio4000';
	}
});
