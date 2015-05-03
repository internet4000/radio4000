import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isEditing', 'isCurrent'],

	// keeping track of editing in a list, so only one track is edited at a time
	// currentTrackComponent: null,

	isCurrent: Ember.computed('playback.model', 'track', function() {
		return this.get('playback.model') === this.get('track');
	}),

	actions: {
		edit() {
			this.sendAction('edit', this.get('track'));
		}
	}

	// isEditing: Ember.computed('currentTrackComponent', 'elementId', function() {
	// 	return this.get('currentTrackComponent') === this.get('elementId');
	// }),

	// actions: {
	// 	// edit() {
	// 	// 	this.set('currentTrackComponent', this.get('elementId'));
	// 	// },
	// 	// cancelEdit() {
	// 	// 	this.set('currentTrackComponent', null);
	// 	// },
	// }
});
