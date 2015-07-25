import Ember from 'ember';
import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
	firebase: Ember.inject.service()
});
