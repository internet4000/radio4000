import Ember from 'ember';

const {Route, debug} = Ember;

export default Route.extend({
	actions: {
		accessDenied(err) {
			if (err) {
				debug(err);
			}
		}
	}
});
