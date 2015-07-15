import FirebaseAdapter from 'emberfire/adapters/firebase';
import Ember from 'ember';

export default FirebaseAdapter.extend({
	firebase: Ember.inject.service()
});
