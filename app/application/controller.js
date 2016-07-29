import Ember from 'ember';

const {Controller, inject} = Ember;

export default Controller.extend({
	player: inject.service(),
	uiStates: inject.service(),
	isEmbed: false,
	isInverted: false,
	queryParams: ['isEmbed', 'isInverted']
});
