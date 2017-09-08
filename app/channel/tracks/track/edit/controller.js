import Ember from 'ember';

const {
	Controller,
	get} = Ember;

export default Controller.extend({

	actions: {
		cancelAndBack() {
			get(this, 'model').rollbackAttributes()
			this.send('goBack')
		},
		goBack() {
			this.transitionToRoute('channel.tracks')
		}
	}
});
