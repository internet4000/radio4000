import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {

		return Ember.RSVP.hash({
			// get all featured channels
			featured: this.store.find('channel', {
				orderBy: 'isFeatured',
				equalTo: true
			}),

			// get channels
			popular: this.store.find('channel', {

				// TODO: this should be the channel-publics
				// with the most followers.
				// but couldn't figure out how to emberfire that
				// so we load all data and do it in the controller
			})
		});
	}
});
