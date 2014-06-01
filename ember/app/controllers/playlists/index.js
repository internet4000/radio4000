var PlaylistsIndexController = Ember.ArrayController.extend({

	// Sort by newest on top
	sortProperties: ['created'],
	sortAscending: false
});

export default PlaylistsIndexController;
