import Ember from 'ember';

const {Component, inject} = Ember;

export default Component.extend({
	classNames: ['RadioBot'],
	bot: inject.service(),
	player: inject.service()
});

