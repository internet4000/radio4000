import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		this.get('session.currentUser.userSettings.channelsHistory');
	}
});
