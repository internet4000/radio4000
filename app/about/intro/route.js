import Ember from 'ember';

const {Route, inject, RSVP} = Ember;

export default Route.extend({
	uiStates: inject.service(),
	model() {
		return RSVP.hash({
			featured: this.store.query('channel', {
				orderBy: 'isFeatured',
				equalTo: true
			})
		});
	}
});
