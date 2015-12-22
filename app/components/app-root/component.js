import Ember from 'ember';

const {$, Component, inject, run} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	player: inject.service(),

	classNames: ['Root'],
	classNameBindings: [
		'uiStates.isFullscreen',
		'uiStates.isMinimal',
		'uiStates.isPanelLeftVisible:is-panelLeftVisible',
		'player.model:is-withPlayer:is-withoutPlayer'
	],

	didInsertElement() {
		run.scheduleOnce('afterRender', () => {
			this.removeDummyHTML();
		});
	},

	// Remove our dummy app with inline styles.
	removeDummyHTML() {
		const $dummy = $('.DummyApp');

		$dummy.fadeTo(200, 0, 'linear', () => {
			// Wrap it in a run loop to avoid lags.
			run.schedule('afterRender', () => {
				$dummy.remove();
			});
		});
	}
});
