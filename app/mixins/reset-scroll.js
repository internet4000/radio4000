/* global window */

// Use this in a controller, or don't

import Mixin from '@ember/object/mixin';

export default Mixin.create({
	activate() {
		this._super(...arguments);
		window.scrollTo(0, 0);
	}
});
