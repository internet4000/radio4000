import Ember from 'ember';
import goBackMixin from 'radio4000/mixins/go-back';

export default Ember.Component.extend(goBackMixin, {
	tagName: 'nav',
	classNames: ['NavBar'],
	classNameBindings: ['isPanelOpen:is-panelOpen'],

	// @TODO
	// click() {
	// 	if (this.get('isPanelOpen')) {
	// 		// Ember.run.schedule('afterRender', () => {
	// 			this.set('isPanelOpen', false);
	// 		// });
	// 	}

	// 	// close on top bar, links in the panel nav and on the overlay
	// 	// this.$().on('click.app', '.SiteLogo, .PanelNav a, .PanelNav-overlay', function() {
	// },

	actions: {
		togglePanel() {
			this.toggleProperty('isPanelOpen');
		}
	}
});
