import Ember from 'ember';

const {Route, get} = Ember;

export default Route.extend({
	model() {
		const user = get(this, 'session.currentUser');
		const userChannel = get(user, 'channels.firstObject');
		if (!user || !userChannel) {
			this.transitionTo('login');
		}
		return userChannel;
	},
	afterModel(model) {
		console.log(get(model, 'title'));
	}
});
