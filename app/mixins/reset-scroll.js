/* global window */

// Use this in a controller, or don't

import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	beforeModel() {
		window.scrollTo(0, 0);
		this._super(...arguments);
	}
});
