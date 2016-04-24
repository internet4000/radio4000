import Ember from 'ember';

const {Component, inject} = Ember;

export default Component.extend({
	classNames: ['Bot'],

	bot: inject.service(),
	player: inject.service()
});

