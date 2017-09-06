import Ember from 'ember';

const {
	Controller,
	get} = Ember;

export default Controller.extend({

	actions: {
		cancel() {
			this.send('transitionRoute');
		},
		transitionRoute() {
			get(this, 'model').rollbackAttributes();
			this.transitionToRoute('channel.tracks');
		}
	}
});
