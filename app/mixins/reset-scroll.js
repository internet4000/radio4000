/* global window */

// Use this in a controller, or don't

import Ember from 'ember';

const {Mixin, observer} = Ember;

export default Mixin.create({
	scrollUp: observer('model', () => {
		window.scrollTo(0, 0);
	})
});
