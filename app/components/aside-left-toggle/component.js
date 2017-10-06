import { inject as service } from '@ember/service';
import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
	uiStates: service(),
	attributeBindings: ['title'],
	classNames: ['Aside-toggle'],
	classNameBindings: ['isToggled:is-active'],
	title: computed('isToggled', function () {
		if (get(this, 'isToggled')) {
			return 'Close the navigation menu';
		}
		return 'Open the navigation menu';
	}),
	isToggled: oneWay('uiStates.isPanelLeftVisible'),
	click() {
		get(this, 'uiStates').togglePanelLeft();
	},
	html: '<'
});
