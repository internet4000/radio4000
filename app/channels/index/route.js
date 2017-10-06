import Route from '@ember/routing/route';
import RSVP from 'rsvp';

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
