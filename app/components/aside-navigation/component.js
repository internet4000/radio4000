import Component from '@ember/component'
import {get} from '@ember/object'
import {inject as service} from '@ember/service'

export default Component.extend({
	uiStates: service(),
	player: service(),
	session: service(),

	tagName: 'aside',
	ariaRole: 'navigation',
	replace: true,

	actions: {
		addTrack(trackModel) {
			get(this, 'onClick')(trackModel);
		},
		openShortcutsModal() {
			this.set('uiStates.showShortcutsModal', true)
		}
	}
});
