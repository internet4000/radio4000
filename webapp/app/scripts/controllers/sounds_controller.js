App.SoundsController = Ember.ArrayController.extend({
	isHidden: false,
	actions: {
		toggleSound: function() {
			this.toggleProperty('isHidden');
		},
		pause: function() {
			console.log('pause from sounds controller');
		}
	}
});
