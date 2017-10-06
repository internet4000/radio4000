/* global window */
import Component from '@ember/component';

export default Component.extend({
	classNames: ['FooterNote'],

	click() {
		window.scrollTo(0, 0);
	}
});
