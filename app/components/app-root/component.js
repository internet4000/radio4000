import Ember from 'ember';

export default Ember.Component.extend({
	uiStates: Ember.inject.service(),
	player: Ember.inject.service(),

	classNameBindings: [
		'uiStates.isFullscreen',
		'uiStates.isMinimal',
		'player.model:is-withPlayer:is-withoutPlayer'
	],

	didInsertElement() {
		this.removeDummyHTML();
	},

	// Remove our dummy app with inline styles
	removeDummyHTML() {
		let $dummy = Ember.$('.DummyApp');

		$dummy.fadeOut({
			duration: 200,
			easing: 'linear',
			complete: function() {

				// wrap it in a run loop to ensure template is rendered
				Ember.run.schedule('afterRender', () => {
					$dummy.remove();
				});
			}
		});
	}
});
