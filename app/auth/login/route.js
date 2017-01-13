import Ember from 'ember';

const {Route, get} = Ember;

export default Route.extend({
    beforeModel(transition) {
	if (get(this, 'session.isAuthenticated')) {
	    return transition.send('redirectAfterAuth');
	}
    },

    actions: {
	redirectAfterAuth() {
	    return get(this, 'session.currentUser.channels').then(channels => {
		const userChannel = get(channels, 'firstObject');
		if (userChannel) {
		    return this.transitionTo('channel', userChannel);
		}
		return this.transitionTo('channels.new');
	    });
	}
    }
});
