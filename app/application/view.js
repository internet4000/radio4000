import Ember from 'ember';

export default Ember.View.extend({
	classNames: ['BreadAndCheese'],
	classNameBindings: [
		'controller.isFullscreen',
		'controller.player.model:is-withPlayer:is-withoutPlayer',
		'controller.isMinimalUi:is-minimalUi'
	],

	didInsertElement() {
		const self = this;

		// Remove our dummy app with inline styles
		let $dummy = Ember.$('.DummyApp');
		$dummy.fadeOut({
			duration: 200,
			easing: 'linear',
			complete: function() {
				Ember.run.schedule('afterRender', () => {
					$dummy.remove();
				});
			}
		});
	}
});
