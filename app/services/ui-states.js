/* global document */
import Ember from 'ember';
import Cookies from 'npm:js-cookie';

const {Service, computed, get, set, on} = Ember;

export default Service.extend({
	// Set the format to 0 for mini, 1 for normal or 2 for max
	format: 1,
	isMinimized: computed.equal('format', 0),
	// isNormal: computed.equal('format', 1),
	isFullscreen: computed.equal('format', 2),
	cycleFormat() {
		let format = get(this, 'format');
		if (format >= 2) {
			set(this, 'format', 0);
			return;
		}
		this.incrementProperty('format');
	},
	toggleMinimizedFormat() {
		if (get(this, 'format') === 0) {
			set(this, 'format', 1);
			return;
		}
		set(this, 'format', 0);
	},
	toggleFullscreenFormat() {
		if (get(this, 'format') === 2) {
			set(this, 'format', 1);
			return;
		}
		set(this, 'format', 2);
	},

	setInitialWidth: on('init', function () {
		const body = document.querySelector('body');
		const width = body.getBoundingClientRect().width;
		this.set('initialWidth', width);
	}),

	// 513px is our current breakpoint for panel to be full width.
	isSmallScreen: computed('initialWidth', function () {
		return this.get('initialWidth') < 650;
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
		if (get(this, 'isSmallScreen')) {
			set(this, 'isPanelLeftVisible', false);
		}
	}
});
