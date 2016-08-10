import Ember from 'ember';

const {Route, get} = Ember;

export default Ember.Route.extend({
	model() {
		const user = get(this, 'session.currentUser');
		const channel = user.get('channels.firstObject');
		return channel;
	}
});
