/* global navigator */
import Ember from 'ember';

export default Ember.Component.extend({

	// Detect if we're on an iOS device
	// it's a CP so we can use it in our templates
	iOS: Ember.computed('', function () {
		let iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
		return iOS;
	})
});
