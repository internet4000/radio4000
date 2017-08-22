import Ember from 'ember';

const {Controller,
			 computed,
			 inject} = Ember;

export default Controller.extend({
	channelController: inject.controller('channel'),
	canEdit: computed.reads('channel.canEdit')
});
