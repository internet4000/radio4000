App.ApplicationController = Ember.Controller.extend({

	// these properties and actions should be on a more specific controller but I don't know which one.
	// The sounds controller could work but doesn't since it has nothing to do with the playback view where the buttons are
	isPlaying: false,
	isMaximized: false,
	autoPlay: true,

	actions: {
		play: function() {
			this.set('isPlaying', true);
		},
		pause: function() {
			this.set('isPlaying', false);
		},
		maximize: function() {
			this.toggleProperty('isMaximized');
		}
	}
});
