import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		const channel = this.modelFor('channel');
		console.log('channel', channel)
		return this.store.query('track', {
			orderBy: 'channel',
			equalTo: channel.id
		})
	}
});
