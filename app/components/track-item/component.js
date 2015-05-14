import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Track'],
	classNameBindings: ['isCurrent'],

	// true if the current track is loaded in the playback
	isCurrent: Ember.computed('playback.model', 'track', function() {
		return this.get('playback.model') === this.get('track');
	}),

	actions: {
		edit() {
			this.sendAction('edit', this.get('track'));
		}
	}
});
