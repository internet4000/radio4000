import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// if we don't load all playlists here, some things aren't properly loaded:
		// - user favorites
		// - user playlists
	},
	actions: {
		login: function(provider) {
			this.get('session').login(provider);
		},
		logout: function() {
			this.get('session').logout();
		}
	}
});
