import Ember from 'ember';

export default Ember.View.extend({
	classNames: ['BreadAndCheese'],
	classNameBindings: [
		'controller.isFullscreen',
		'controller.player.model:is-withPlayer:is-withoutPlayer',
		'controller.isPanelOpen:is-panelOpen',
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

		// close on top bar, links in the panel nav and on the overlay
		this.$().on('click.app', '.SiteLogo, .PanelNav a, .PanelNav-overlay', function() {
			Ember.run.schedule('afterRender', () => {
				self.set('controller.isPanelOpen', false);
			});
		});
	},

	willDestroyElement() {
		this.$().off('click.app');
	}
});
