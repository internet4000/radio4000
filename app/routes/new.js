import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition) {
		// if you visit this route via an url the auth object hasn't checked auth status yet
		// if we do the check inside this run loop, it works
		// @todo find a normal way of first executing this after authed is checked
		// or… delay ember app while auth is checking

	  	// code here will execute within a RunLoop in about 500ms
  		Ember.run.later(this, function(){
	  		if (!this.get('auth.authed')) {
				Ember.debug('sorry, not logged in');
				alert('Sorry, you have to be logged in to create a new playlist.');
				this.transitionTo('application');
			}
		}, 250);
	},
});
