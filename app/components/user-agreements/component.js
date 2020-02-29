import Component from '@ember/component';
import Ember from 'ember';
const {get} = Ember;

export default Component.extend({
	title: 'Read the User agreements! :}',
	open: false,
	agreed: false,
	actions: {
		userAgreed(event) {
			const onAgreed = get(this, 'onAgreed')
			if (typeof onAgreed === 'function') {
				onAgreed(event)
			}
		}
	}
});
