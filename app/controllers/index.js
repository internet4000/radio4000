// most of this is duplicate code of app controller. should send events there instead?

import Ember from 'ember';

export default Ember.ArrayController.extend({
	actions: {
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		}
	}
});
