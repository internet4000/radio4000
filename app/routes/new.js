import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return Ember.Object.create();
	},
	afterModel: function(transition) {

		// if you visit this route via an url the auth object hasn't checked auth status yet
		// if we do the check inside this run loop, it works
		// @todo find a normal way of first executing this after authed is checked
		// or… delay ember app while auth is checking
	  	// code here will execute within a RunLoop in about 500ms
  		Ember.run.next(this, function(){

			if (!this.get('session.authed')) {
				this.transitionTo('login');
			}

			if (this.get('session.user.playlists.length')) {
				this.transitionTo('application');
			}

		}, 250);
	}
});
