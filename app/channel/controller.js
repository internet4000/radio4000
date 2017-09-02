import Ember from 'ember';

const {get, computed} = Ember;

export default Ember.Controller.extend({
	player: Ember.inject.service()
});
