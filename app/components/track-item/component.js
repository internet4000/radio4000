import Ember from 'ember';

const {Component, computed, inject} = Ember;

export default Component.extend({
	player: inject.service(),
	classNames: ['Track'],
	classNameBindings: ['isCurrent'],

	// true if the current track is loaded in the player
	// isCurrent: computed.equal('player.model', 'track'),
	isCurrent: computed('player.model', 'track', function () {
		return this.get('player.model') === this.get('track');
	}),

	actions: {
		edit() {
			this.get('edit')(this.get('track'));
		},
		play(track) {
			this.set('player.model', track);
		}
	}
});
