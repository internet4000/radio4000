var TracksController = Ember.ArrayController.extend({
	sortProperties: ['created'],
	sortAscending: false // newest on top
});

export default TracksController;
