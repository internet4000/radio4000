Webapp.SoundsController = Ember.ArrayController.extend({
	isHidden: false,
	actions: {
		toggleSound: function() {
			this.toggleProperty('isHidden');
		}
	}
});
