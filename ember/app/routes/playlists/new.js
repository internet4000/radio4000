import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {

		// abort if not logged in
		if (!this.get('auth.authed')) {
			this.transitionTo('application');
		}

		// // abort if the user already has a playlist
		// this.get('store').find('user', auth.get('user.id')).then(function(user) {
		// 	if (user.get('hasPlaylist')) {
		// 		alert('Sorry, you already have a playlist. Go add tracks!');
		// 		self.transitionTo('application');
		// 	}
		// });
	}
});
