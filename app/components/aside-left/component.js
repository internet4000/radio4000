import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
	uiStates: service(),
	tagName: 'aside',
	classNames: ['Aside', 'Aside--left'],

	isActive: alias('uiStates.isPanelLeftVisible'),

	actions: {
		addTrack() {
			get(this, 'toggleModal')();
		}
	}
});
