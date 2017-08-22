import Ember from 'ember';

const {Controller, inject} = Ember;

export default Controller.extend({
	channelController: inject.controller('channel'),
});
