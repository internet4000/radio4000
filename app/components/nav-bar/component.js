import Ember from 'ember';
import goBackMixin from 'radio4000/mixins/go-back';

export default Ember.Component.extend(goBackMixin, {
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
