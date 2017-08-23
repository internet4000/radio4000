import Ember from 'ember';

const {Controller,
			 get} = Ember;

export default Controller.extend({

	actions: {
		cancel() {
			get(this, 'model').rollbackAttributes();
			this.send('transitionRoute');
		},
		transitionRoute() {
			this.transitionToRoute('channel.tracks');
		}
	}
});
