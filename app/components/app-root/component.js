import Ember from 'ember';

const {$, Component, inject, run} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	player: inject.service(),

	classNames: ['Root'],
	classNameBindings: [
		'uiStates.isFullscreen',
		'uiStates.isMinimal',
		'player.model:is-withPlayer:is-withoutPlayer'
	],

	didInsertElement() {
		run.scheduleOnce('afterRender', () => {
			this.removeDummyHTML();
		});
	},

	// Remove our dummy app with inline styles
	removeDummyHTML() {
		let $dummy = $('.DummyApp');

		$dummy.fadeTo(200, 0, 'linear', function () {
			// wrap it in a run loop to ensure template is rendered
			run.schedule('afterRender', () => {
				$dummy.remove();
			});
		});
	}
});
