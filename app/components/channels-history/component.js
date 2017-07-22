import Ember from 'ember';

const {Component, inject, computed} = Ember;

export default Component.extend({
	player: inject.service(),
	items: null,
	noHistory: computed.empty('items'),
	actions: {
		clearChannelHistory() {
			this.get('player').clearChannelHistory();
		}
	}
});
