/**
 * Use this in a controller, or don't
 */

import Ember from 'ember';

export default Ember.Mixin.create({
	scrollUp: Ember.observer('model', function() {
		window.scrollTo(0,0);
	})
});
