import Ember from 'ember';

export default Ember.Component.extend({

	// Detect if we're on an iOS device
	iOS: () => {
		var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
		return iOS;
	}.property()
});
