import Ember from 'ember';

export default Ember.Route.extend({
	favorites: 0,

	setupController(controller) {
		var that = this;
		var channels = this.store.find('channel');
		var tracks = this.store.find('track');
		var users = this.store.find('user');

		controller.set('channels', channels);
		controller.set('tracks', tracks);
		controller.set('users', users);

		users.then(function(users) {
			users.forEach(function(user) {
				var favs = user.get('favoriteChannels.length');
				that.incrementProperty('favorites', favs);
			});
			controller.set('favorites', that.get('favorites'));
		});
	}
});
