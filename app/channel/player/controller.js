import Ember from 'ember';
import Controller from '@ember/controller';

const { inject, get } = Ember;

export default Controller.extend({
	player: inject.service()
});
