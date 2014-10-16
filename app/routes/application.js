import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// if we don't load all playlists here, some things aren't properly loaded:
		// - user favorites
		// - user playlists
		return this.store.find('user'), this.store.find('playlist');
	},
	actions: {
		// pass the actions on to auth
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		}
	}
});
