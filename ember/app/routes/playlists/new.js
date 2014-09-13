import Ember from 'ember';

export default Ember.Route.extend({
	/*
	beforeModel: function() {
		var self = this;

		// abort if the user already has a playlist

		this.get('store').find('user', auth.get('user.id')).then(function(user) {
			if (user.get('hasPlaylist')) {
				alert('Sorry, you already have a playlist. Go add tracks!');
				self.transitionTo('application');
			}
		});
	}
	*/
});
