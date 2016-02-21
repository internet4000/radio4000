import Ember from 'ember';

const {Controller, computed, inject} = Ember;

export default Controller.extend({
	player: inject.service(),
	userChannel: computed.alias('session.currentUser.channels.firstObject')
});
