import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['auth']
	// this.get('controllers.auth');
});
