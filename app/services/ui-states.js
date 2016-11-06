/* global document */
import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

const {computed, on} = Ember;

export default Ember.Service.extend({
	// 0: minimized
	// 1: normal
	// 2: fullscreen
	format: 1,
	isMinimized: computed.equal('format', 0),
	isFullscreen: computed.equal('format', 2),
	cyclePlayerFormat() {
		let format = get(this, 'format');
		if (format >= 2) {
			set(this, 'format', 0);
			return;
		}
		this.incrementProperty('format');
	},

	setInitialWidth: on('init', function () {
		const xBrowserWidth = document.querySelector('body').getBoundingClientRect().width;
		this.set('initialWidth', xBrowserWidth);
	}),

	// 513px is our current breakpoint for panel to be full width.
	isSmallScreen: computed('initialWidth', function () {
		return this.get('initialWidth') < 513;
	}),

	// isPanelLeftVisible: true,
	isPanelLeftVisible: computed({
		get() {
			if (this.get('isSmallScreen')) {
				return false;
			}

			// if the cookie is undefined (not set), it returns true
			// or if the cookie has 'true' as value, return true
			const noCookie = Cookies.get('isPanelOpen') === undefined;
			return noCookie || Cookies.get('isPanelOpen') === 'true';
		},
		set(key, value) {
			Cookies.set('isPanelOpen', value, {expires: 7});
			return value;
		}
	}),

	togglePanelLeft() {
		this.toggleProperty('isPanelLeftVisible');
	},

	// Only close if we're on a small screen.
	closeLeftPanelIfSmallScreen() {
		if (this.get('isSmallScreen')) {
			this.set('isPanelLeftVisible', false);
		}
	}
});
