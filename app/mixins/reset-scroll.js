/* global window */

// Use this in a controller, or don't

import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	activate() {
		this._super(...arguments);
		window.scrollTo(0, 0);
	}
});
