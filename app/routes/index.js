import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return this.store.find('user'), this.store.find('playlist');
	}
