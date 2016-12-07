import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
		actions: {
				login(provider, ...data) {
						get(this, 'onLogin')(provider, data);
				}
		}
});
