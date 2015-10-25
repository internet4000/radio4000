import Ember from 'ember';

const {Route, RSVP} = Ember;

export default Route.extend({
	model() {
		return RSVP.hash({
			featured: this.store.query('channel', {
				orderBy: 'isFeatured',
				equalTo: true
			}),
			userChannel: this.get('session.currentUser.channels.firstObject')
		});
	}
});
