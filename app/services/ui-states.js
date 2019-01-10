/* global document */
import Ember from 'ember';

const {Service, computed, get, set, on} = Ember;

export default Service.extend({

	isPanelLeftVisible: false,

	// Logic for showing keyboard shortcuts modal
	showShortcutsModal: false,

	// Set the format to 0 for mini, 1 for normal or 2 for max
	format: computed('isMediumScreen', function() {
		return get(this, 'isMediumScreen') ? 0 : 1
	}),
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
	toggleNormalFormat() {
		if (get(this, 'format') === 1) {
			set(this, 'format', 1);
			return;
		}
		set(this, 'format', 2);
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

	isMediumScreen: computed('initialWidth', function () {
		return this.get('initialWidth') < 1000;
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
