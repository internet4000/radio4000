App.ApplicationController = Ember.Controller.extend({
	isPlaying: false,
	isMaximized: false,

	actions: {
		play: function() {
			this.set('isPlaying', true);
		},
		pause: function() {
			this.set('isPlaying', false);
		},
		maximize: function() {
			this.toggleProperty('isMaximized');
			console.log(this.get('isMaximized'));
		}
	}
});
