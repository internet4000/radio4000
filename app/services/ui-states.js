/* global document */
import Ember from 'ember';

const {Service, computed, get, set, on} = Ember;

export default Service.extend({
	initialWidth: null,
	// Logic for showing keyboard shortcuts modal
	showShortcutsModal: false,

	init() {
		this._super(...arguments)
		document.addEventListener('fullscreenchange', () => {
			if (!document.fullscreenElement && get(this, 'isFullscreen')) {
				this.toggleFullscreenFormat()
			}
		});
	},

	// all formats
	isMinimized: computed.equal('format', 0),
	isNormal: computed.equal('format', 1),
	isFullscreen: computed.equal('format', 2),
	isDocked: computed.equal('format', 3),

	format: computed('isMediumScreen', function() {
		if (this.isPlayerFullscreen()) {
			return 1
		}
		return get(this, 'isMediumScreen') ? 0 : 1
	}),
	cycleFormat() {
		// if we're fullscreen, just go out
		if (this.isPlayerFullscreen()) {
			this.exitFullscreen()
		}

		if (get(this, 'isNormal')) {
			return this.toggleMinimizedFormat()
		}
		if (get(this, 'isMinimized')) {
			return this.toggleFullscreenFormat()
		}
		if (get(this, 'isFullscreen')) {
			if (get(this, 'isMediumScreen')) {
				this.toggleMinimizedFormat()
			} else {
				this.toggleNormalFormat()
			}
		}
		if (get(this, 'isDocked')) {
			return this.toggleDockedFormat()
		}
	},

	isPlayerFullscreen() {
		return document.fullscreen
	},
	exitFullscreen() {
		document.exitFullscreen()
	},

	// actions used by player UI buttons
	toggleMinimizedFormat() {
		if (this.isPlayerFullscreen()) {
			this.exitFullscreen()
		}
		if (get(this, 'isMinimized')) {
			this.toggleNormalFormat()
			return;
		}
		set(this, 'format', 0);
	},
	toggleNormalFormat() {
		if (this.isPlayerFullscreen) {
			this.exitFullscreen()
		}

		if (get(this, 'isNormal')) {
			this.toggleFullscreenFormat()
			return;
		}
		if (get(this, 'isMediumScreen')) {
			this.toggleMinimizedFormat()
			return;
		}
		set(this, 'format', 1);
	},
	toggleFullscreenFormat() {
		if (get(this, 'isFullscreen')) {
			if (get(this, 'isMediumScreen')) {
				this.toggleMinimizedFormat()
			} else {
				this.toggleNormalFormat()
			}
			return;
		}
		window.document.querySelector('.Aside--right').requestFullscreen()
		set(this, 'format', 2);
	},
	toggleDockedFormat() {
		if (get(this, 'isDocked')) {
			this.toggleNormalFormat()
			return;
		}
		set(this, 'format', 3);
	},

	// responsive initial width for player
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
	})
});
