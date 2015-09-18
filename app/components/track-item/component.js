import Ember from 'ember';

export default Ember.Component.extend({
	player: Ember.inject.service(),
	classNames: ['Track'],
	classNameBindings: ['isCurrent'],

	// true if the current track is loaded in the player
	// isCurrent: Ember.computed.equal('player.model', 'track'),
	isCurrent: Ember.computed('player.model', 'track', function() {
		return this.get('player.model') === this.get('track');
	}),

	actions: {
		edit() {
			this.sendAction('edit', this.get('track'));
		},
		transitionToTrack(track) {
			this.sendAction('onTransition', track);
		}
	}
});
