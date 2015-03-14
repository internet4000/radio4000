import Ember from 'ember';
import layout from '../templates/components/x-tracks';

export default Ember.Component.extend(Ember.SortableMixin, {
	layout: layout,

	// Newest on top
	sortProperties: ['created'],
	sortAscending: false,

	// Keep track of which track we're currently editing
	currentTrackComponent: null
});
