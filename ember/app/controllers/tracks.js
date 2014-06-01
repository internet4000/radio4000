var TracksController = Ember.ArrayController.extend({
	needs: ['auth', 'playlist'],

	// Sort by newest on top
	sortProperties: ['created'],
	sortAscending: false,
});

export default TracksController;
