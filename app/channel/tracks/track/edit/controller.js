import Ember from 'ember';

const {Controller,
			 get} = Ember;

export default Controller.extend({

	actions: {
		cancel() {
			this.send('transitionRoute');
		},
		transitionRoute() {
			this.transitionToRoute('channel.tracks');
		}
	}
});
