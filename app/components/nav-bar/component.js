import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'nav',
	classNames: ['NavBar'],
	classNameBindings: ['isPanelOpen:is-panelOpen'],

	actions: {
		togglePanel() {
			this.toggleProperty('isPanelOpen');
		},
		closePanel() {
			this.set('isPanelOpen', false);
		}
	}
});
