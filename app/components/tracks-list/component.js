import Ember from 'ember';

export default Ember.Component.extend(Ember.SortableMixin, {
	// Newest on top
	sortProperties: ['created'],
	sortAscending: false,

	// Keep track of which track we're currently editing
	currentTrackComponent: null
});
